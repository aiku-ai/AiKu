import sharp from 'sharp'
import fs from 'fs';
import { useValidatedBody, z } from 'h3-zod'
import { PrismaClient } from '@prisma/client'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

/**
 * Create a Aiku.
**/
export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const fontConf = await useStorage().getItem(`assets/fonts/fonts.conf`)
  const fontBold = await useStorage().getItem(`assets/fonts/SpaceMono-Bold.ttf`)
  const fontReg = await useStorage().getItem(`assets/fonts/SpaceMono-Regular.ttf`)

  try {
    // const root = '/tmp/fonts'
    const root = '/usr/share/fonts/truetype/Space_Mono'
    fs.mkdirSync(root)
    // fs.mkdirSync('/tmp/fonts-cache')
    // fs.appendFileSync(`${root}/fonts.conf`, fontConf)
    fs.appendFileSync(`${root}/SpaceMono-Regular.ttf`, fontReg)
    fs.appendFileSync(`${root}/SpaceMono-Bold.ttf`, fontBold)

    // process.env.FONTCONFIG_PATH = root

    // let dirContents = fs.readdirSync('/var/task/.netlify/functions-internal/server')
    // console.log(dirContents)
  } catch(error) {
    console.log(error)
  }

  const body = await useValidatedBody(event, z.object({
    lineOne: z.string(),
    lineTwo: z.string(),
    lineThree: z.string(),
    sdUrl: z.string(),
    presetId: z.number().nullable().optional()
  }))

  // needed both for the DB record and for the file name of the bucket object
  const aikuId = uuidv4()

  const imgBuffer = await getReplicateImage(body.sdUrl)
  const cardImgBuffer = await processImageEdit(Buffer.from(imgBuffer, "utf8"), body.lineOne, body.lineTwo, body.lineThree)

  const uploadRespBase = await uploadImage(new Blob([imgBuffer]), event, aikuId)
  const uploadRespOverlay = await uploadImage(new Blob([cardImgBuffer]), event, `${aikuId}_overlay`)

  if (!uploadRespBase || !uploadRespOverlay) {
    throw createError({ statusCode: 500, message: 'Failed to upload AiKu image' })
  }

  // insert AiKu db record
  await prisma.aiku.create({
    data: {
      id: aikuId,
      createdAt: new Date(),
      lineOne: body.lineOne,
      lineTwo: body.lineTwo,
      lineThree: body.lineThree,
      userId: user.id,
      sdUrl: body.sdUrl,
      presetId: body.presetId
    }
  })

  return event.node.res.end()
})

const getReplicateImage = async (url:string):Promise<ArrayBuffer> => {
  return await $fetch(url, {
    responseType: 'arrayBuffer'
  })
}

const uploadImage = async (img:Blob, event:any, fileName:string):Promise<string | null> => {
  const client = serverSupabaseClient(event)  
  
  const { data, error } = await client.storage
    .from('aikus')
    .upload(`${fileName}.png`, img)

  if (error) {
    return null
  }

  return data.path
}

const processImageEdit = async (
  img:Buffer, 
  lineOne:string, 
  lineTwo:string, 
  lineThree:string
):Promise<Buffer> => {
  const width = 440
  const height = 770
  const left = Math.round((768 - width) / 2)
  const top = Math.round((896 - height) / 2)

  let image:Buffer
  image = await cropAndRadius(img, width, height, left, top)
  image = await addTextOnImage(image, height, width, lineOne, lineTwo, lineThree)
  return image
}

const cropAndRadius = async (
  image:Buffer, 
  width:number, 
  height:number,
  left:number,
  top:number
):Promise<Buffer> => {
  const rect = Buffer.from(
    `<svg><rect x="0" y="0" width="${width}" height="${height}" rx="10" ry="10"/></svg>`
  );
  const croppedImg = sharp(image)
    .extract({ width: width, height: height, left: left, top: top })
    .composite([
      { input: rect, blend: "dest-atop"}
    ])
    .toBuffer()
  return croppedImg
}

const addTextOnImage = async (
  image:Buffer, 
  imgHeight:number, 
  imgWidth:number,
  lineOne:string,
  lineTwo:string,
  lineThree:string
):Promise<Buffer> => {
  const svgWidth = imgWidth;
  const svgHeight = 150;
  const svgTopPos = imgHeight - svgHeight - 10

  const svgImage = `
    <svg width="${svgWidth}" height="${svgHeight}">
      <style>
        <![CDATA[
          @font-face{
            font-family: 'Space Mono';
            src: url(/tmp/fonts/SpaceMono-Bold.ttf);
            font-weight: bold;
            font-style: normal;
          }
          @font-face{
            font-family: 'Space Mono';
            src: url(/tmp/fonts/SpaceMono-Regular.ttf);
            font-weight: normal;
            font-style: normal;
          }

          .title { 
            fill: #fff; 
            font-size: 20px;
          }
          .tag {
            fill: #e4e4e7
            font-size: 20px;
          }
        ]]>
      </style>
      <rect width="${svgWidth - 20}" height="${svgHeight}" rx="10" fill="black" fill-opacity="0.5"/>
      <text x="5%" y="35" text-anchor="start" class="title" font-family="Space Mono" font-weight="bold">${lineOne}
        <tspan x="5%" y="65" text-anchor="start" class="title" font-family="Space Mono" font-weight="bold">${lineTwo}</tspan>
        <tspan x="5%" y="95" text-anchor="start" class="title" font-family="Space Mono" font-weight="bold">${lineThree}</tspan>
      </text>
      <text x="5%" y="130" text-anchor="start" class="title" font-family="Space Mono" font-weight="normal">aiku.app</text>
    </svg>
    `;
  const svgBuffer = Buffer.from(svgImage);
  const imageResp = await sharp(image)
    .composite([
      {
        input: svgBuffer,
        top: svgTopPos,
        left: 10,
      },
    ])
    .toBuffer()

  return imageResp
}

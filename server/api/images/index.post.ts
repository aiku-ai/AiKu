import { useValidatedBody, z } from 'h3-zod'
import sharp from 'sharp'

const config = useRuntimeConfig()

export default defineEventHandler(async (event):Promise<String> => {
  const body = await useValidatedBody(event, z.object({
    imgUrl: z.string(),
  }))
  
  const response = await $fetch(body.imgUrl, {
    responseType: 'arrayBuffer'
  })
  const buffer = Buffer.from(response, "utf-8")

  
  const croppedImage = await resizeImage(buffer)
  console.log(croppedImage)
  await addTextOnImage(croppedImage)

  return "foo"
})


async function resizeImage(image:Buffer):Promise<Buffer> {

  try {
    const sharpInst = sharp(image)
      .extract({ width: 400, height: 800, left: 184, top: 40  })
      .toBuffer()

    return sharpInst
  } catch(error) {
    console.log(error)
  }
}


async function addTextOnImage(image:Buffer) {
  try {
    const width = 400;
    const height = 50;
    const text = "Hello world, test";

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { fill: #fff; font-size: 20px; font-weight: bold;}
      </style>
      <text x="0%" y="50%" text-anchor="start" class="title">${text}</text>
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const imageResp = await sharp(image)
      .composite([
        {
          input: svgBuffer,
          top: 700,
          left: 10,
        },
      ])
      .toFile("test-image.png");
  } catch (error) {
    console.log(error);
  }
}

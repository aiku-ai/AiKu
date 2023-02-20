import type { InjectionKey, Ref } from 'vue'

export const aikuLineOneKey = Symbol() as InjectionKey<Ref<string>>
export const aikuLineTwoKey = Symbol() as InjectionKey<Ref<string>>
export const aikuLineThreeKey = Symbol() as InjectionKey<Ref<string>>
export const presetSelectionKey = Symbol() as InjectionKey<Ref<string>>
export const presetSelectionIdKey = Symbol() as InjectionKey<Ref<number | null>>
export const tweakTextKey = Symbol() as InjectionKey<Ref<string>>
export const seedImgUrlKey = Symbol() as InjectionKey<Ref<string>>
export const diffusionUrlsKey = Symbol() as InjectionKey<Ref<string[]>>
export const selectedImgUrlKey = Symbol() as InjectionKey<Ref<string>>

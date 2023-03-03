import type { InjectionKey, Ref } from 'vue'

export const aikuIdKey = Symbol() as InjectionKey<Ref<string>>
export const aikuLineOneKey = Symbol() as InjectionKey<Ref<string>>
export const aikuLineTwoKey = Symbol() as InjectionKey<Ref<string>>
export const aikuLineThreeKey = Symbol() as InjectionKey<Ref<string>>
export const presetSelectionKey = Symbol() as InjectionKey<Ref<string>>
export const presetSelectionIdKey = Symbol() as InjectionKey<Ref<number>>
export const tweakTextKey = Symbol() as InjectionKey<Ref<string>>
export const seedImgUrlKey = Symbol() as InjectionKey<Ref<string>>
export const imgUrlsToRenderKey = Symbol() as InjectionKey<Ref<string[]>>
export const imgUrlsOverlayToRenderKey = Symbol() as InjectionKey<Ref<string[]>>
export const imgUrlKey = Symbol() as InjectionKey<Ref<string>>
export const imgUrlOverlayKey = Symbol() as InjectionKey<Ref<string>>

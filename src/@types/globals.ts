import { ViteSSGContext } from 'vite-ssg'

export type ViteModule = (ctx: ViteSSGContext) => void

export type InputEvent = {
  target: HTMLInputElement
}

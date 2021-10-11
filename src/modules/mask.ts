import { maska } from 'maska'
import { ViteModule } from '@/@types/globals'

export const install: ViteModule = ({ app }) => {
  app.directive('mask', maska)
}

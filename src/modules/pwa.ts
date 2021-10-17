import { ViteModule } from '@/@types/globals'

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: ViteModule = ({ isClient, router }) => {
  if (!isClient) return

  router
    .isReady()
    .then(async() => {
      const { registerSW } = await import('virtual:pwa-register')
      registerSW({ immediate: true })
    })
    .catch(err => console.log('Error on router', err))
}

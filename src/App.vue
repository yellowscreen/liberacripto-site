<script setup lang="ts">import { useAdminStore } from './stores/admin'
import { useUIStore } from '@/stores/ui'

const router = useRouter()
const admin = useAdminStore()
const ui = useUIStore()

router.beforeEach((to) => {
  console.log('[is authenticated?]', admin.isAuth)
  if (to.meta.requiresAuth && !admin.isAuth) return router.replace('/admin/signin')
})

</script>

<template>
  <router-view />
  <div id="modals"></div>
  <Loader v-show="ui.loading" />
</template>

<style lang="scss">
@font-face {
  font-family: "Altone Trial";
  src: url("/fonts/altone-trial.regular.ttf");
  font-style: normal;
}
@font-face {
  font-family: "Altone Trial";
  src: url("/fonts/altone-trial.bold.ttf");
  font-weight: bold;
}
</style>

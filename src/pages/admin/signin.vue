
<route lang="yaml">
name: Admin

meta:
  layout: empty

</route>

<script lang="ts" setup>

import { useAdminStore } from '@/stores/admin'
import { getAuth, getOrdersList } from '@/services/admin'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()
const admin = useAdminStore()
const router = useRouter()

const gapi = ref<any>(null)

function start() {
  gapi.value.client.init({
    clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    scope: 'profile email',
  })
}

function signin() {
  gapi.value.auth2.getAuthInstance().signIn()
    .then(() => storeToken())
}

function storeToken() {
  const token = gapi.value.auth2.getAuthInstance()
    .currentUser.get().getAuthResponse().access_token

  getAuth(token).then(({ data }) => {
    admin.storeToken(data.token.token)
    router.replace({ name: 'AdminHome' })
  })
}

onMounted(() => {
  gapi.value = window.gapi
  gapi.value.load('client', start)

  if (admin.isAuth) {
    ui.toggleLoader(true)

    getOrdersList({ page: 1, limit: 1 }).then(() => {
      router.replace({ name: 'AdminHome' })
    }).catch(() => {
      localStorage.clear()
    }).finally(() => {
      ui.toggleLoader(false)
    })
  }
})
</script>

<template>
  <section
    class="flex flex-col justify-center items-center min-h-screen bg-primary-light text-light-100"
  >
    <img class="mb-40" width="180" height="180" src="/logo-white.svg" />

    <p class="mb-10 text-white font-display">
      Acessar Admin
    </p>

    <Button class="flex items-center bg-cta px-4 py-x rounded-md text-primary-dark" @click="signin">
      <mdi:google class="mr-4 text-xl" />Fazer Login
    </Button>
  </section>
</template>

<style lang="scss">
</style>

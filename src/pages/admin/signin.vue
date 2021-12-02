
<route lang="yaml">
name: Admin

meta:
  layout: empty

</route>

<script lang="ts" setup>

import { useAdminStore } from '@/stores/admin'
import { getAuth, getOrdersList, signn } from '@/services/admin'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()
const admin = useAdminStore()
const router = useRouter()

function signin() {
  // !!! consertar
  getAuth().then((request) => {
    window.open(request.request.responseURL)
    console.log('@@ DATA ', request)
  })
}

onMounted(() => {
  if (admin.isAuth) {
    ui.toggleLoader(true)

    getOrdersList({ page: 1, limit: 1 }).then(() => {
      router.replace({ name: 'AdminHome' })
    }).catch(() => {

    }).finally(() => {
      ui.toggleLoader(false)
    })
  }
})
</script>

<template>
  <section class="flex flex-col justify-center items-center min-h-screen bg-primary-light">
    <img class="mb-40" width="180" height="180" src="/logo-white.svg" />

    <p class="mb-10 text-white font-display">
      Acessar Admin
    </p>

    <Button
      class="flex items-center bg-cta px-4 py-x rounded-md text-primary-dark"
      @click="signin"
    >
      <mdi:google class="mr-4 text-xl" />Fazer Login
    </Button>
  </section>
</template>

<style lang="scss">
</style>

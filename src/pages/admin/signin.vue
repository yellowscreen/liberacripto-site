
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
  <section class="flex justify-center items-center min-h-screen">
    <Button
      class="flex items-center bg-primary-light px-4 py-x rounded-md text-white"
      @click="signin"
    >
      <mdi:google class="mr-4" />Fazer login
    </Button>
  </section>
</template>

<style lang="scss">
</style>

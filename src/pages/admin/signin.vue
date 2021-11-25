
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

function signin() {
  // !!! consertar
  getAuth().then((request) => {
    // location.href = request.responseURL
    console.log(request)
    console.log('@@ DATA ')
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
    <Button class="bg-primary-light px-4 py-x rounded-md text-white" @click="signin">
      Fazer login
    </Button>
  </section>
</template>

<style lang="scss">
</style>

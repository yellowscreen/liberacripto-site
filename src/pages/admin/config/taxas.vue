<route lang="yaml">
name: AdminFees
meta:
  layout: admin
  requiresAuth: true
</route>

<script lang="ts" setup>

import { useAdminStore } from '@/stores/admin'

useHead({
  title: 'Libera Cripto admin',
  meta: [
    { name: 'description', content: 'Libera cripto' },

    { name: 'og:image', content: '/logo.svg' },
    { name: 'og:title', content: 'Libera cripto - Redes' },
    { name: 'og:description', content: 'P2P de cripto' },
  ],
})

const admin = useAdminStore()

onMounted(() => {
  admin.fetchNetworkList()
 
})
</script>

<template>
  <section class="admin-networks-config">
    <div class="header">
      <h2
        class="font-display text-xl text-white font-bold text-center"
      >
        Lista de taxas
      </h2>
    </div>

    <ListNetworksCard class="crypto-list" />

    <ModalAddNetworkCrypto :is-stable-coin="false" @update-list="admin.fetchNetworkList()" />
  </section>
</template>

<style lang="scss">
.admin-networks-config {
  @apply flex flex-col items-center
    w-full min-h-screen;

  > .header {
    @apply flex justify-center items-center flex-shrink-0
    w-full h-120px px-4 py-1
    bg-primary-light;

    box-shadow: 0px 70px 0px 20px #004b74;
  }

  > .crypto-list {
    @apply mx-6 my-10 max-w-600px;

    width: clamp(90%, 600px, 80vw);
  }
}
</style>

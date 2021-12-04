<route lang="yaml">
name: AdminNetwork
meta:
  layout: admin
  requiresAuth: true
</route>

<script lang="ts" setup>

import { deleteNetwork } from '@/services/admin'
import { useAdminStore } from '@/stores/admin'
import { useUIStore } from '@/stores/ui'

useHead({
  title: 'Libera Cripto admin',
  meta: [
    { name: 'description', content: 'Libera cripto' },

    { name: 'og:image', content: '/logo.svg' },
    { name: 'og:title', content: 'Libera cripto - Redes' },
    { name: 'og:description', content: 'P2P de cripto' },
  ],
})

const ui = useUIStore()
const admin = useAdminStore()

const cryptoDetail = ref({ id: '0', name: '-' })

function updateTaxes(crypto: { id: string; name: string }) {
  cryptoDetail.value = crypto

  ui.toggleModal('taxes')
}

function deleteAStablecoin({ id }: {id: string}) {
  deleteNetwork(id).then(() => admin.fetchNetworkList())
}
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
        Lista de Redes cadastradas
      </h2>
    </div>

    <ListNetworksCard
      class="crypto-list"
      @update-taxes="updateTaxes"

      @delete="deleteAStablecoin"
    />

    <ModalAddNetworkCrypto @update-list="admin.fetchNetworkList()" />

    <ModalFees
      :id="cryptoDetail.id"
      :crypto-name="cryptoDetail.name"
      :is-stablecoin="true"
      @update-list="admin.fetchNetworkList()"
    />
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

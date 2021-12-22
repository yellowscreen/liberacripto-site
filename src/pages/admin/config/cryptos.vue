<route lang="yaml">
name: AdminCryptos
meta:
  layout: admin
  requiresAuth: true
</route>

<script lang="ts" setup>

import { deleteCrypto } from '@/services/admin'
import { useAdminStore } from '@/stores/admin'
import { useUIStore } from '@/stores/ui'

useHead({
  title: 'Libera Cripto admin',
  meta: [
    { name: 'description', content: 'Libera cripto' },

    { name: 'og:image', content: '/logo.svg' },
    { name: 'og:title', content: 'Libera cripto - cryptos' },
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

function deleteACrypto({ id }: {id: string}) {
  
  deleteCrypto(id).then(() => admin.fetchCryptoList())
}

onMounted(() => {
  admin.fetchCryptoList()
})
</script>

<template>
  <section class="admin-cryptos-config">
    <div class="header">
      <h2
        class="font-display text-xl text-white font-bold text-center"
      >
        Lista de criptoativos cadastrados
      </h2>
    </div>

    <ListCryptosCard
      class="crypto-list"
      @update-taxes="updateTaxes"
      @delete="deleteACrypto"
    />

    <ModalAddCrypto @update-list="admin.fetchCryptoList()" />
    <ModalFees
      :id="cryptoDetail.id"
      :crypto-name="cryptoDetail.name"
      :is-stablecoin="false"
      @update-list="admin.fetchCryptoList()"
    />
  </section>
</template>

<style lang="scss">
.admin-cryptos-config {
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

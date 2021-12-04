<script lang="ts" setup>
import { useAdminStore } from '@/stores/admin'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()
const admin = useAdminStore()

const emit = defineEmits<{
  (e: 'update-taxes', v: { name: string; id: string}): void
  (e: 'delete', v: { id: string}): void
}>()
</script>

<template>
  <aside class="list-cryptos">
    <CardCrypto
      v-for="crypto in admin.listCryptos"
      :id="crypto.id"
      :key="crypto.id"
      class="card"
      :wallet="crypto.wallet"
      :crypto="crypto.code"
      :name="crypto.name"
      @update-taxes="emit('update-taxes', $event)"
      @delete="emit('delete', $event)"
    />

    <h2 v-if="!admin.listCryptos.length" class="text-xl font-display font-bold  mt-5/10">
      Não há criptoativos no momento.
    </h2>

    <Button class="add-crypto" @click="ui.toggleModal('add-crypto')">
      <ic:round-add class="mr-4 text-xl" />
      <span>Adicionar criptoativos</span>
    </Button>
  </aside>
</template>

<style lang="scss">
.list-cryptos {
  @apply flex flex-col items-center
    px-6 py-6 min-h-400px
    bg-white rounded-xl;

  > .header {
    @apply w-full
        mb-6
        text-left font-display;

    @screen md {
      @apply text-xl;
    }
  }

  > .card {
    @apply mb-4 cursor-pointer;
  }

  > .add-crypto {
    @apply mt-6 flex justify-center items-center w-full bg-primary-light text-white;
  }
}
</style>

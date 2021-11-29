<script lang="ts" setup>
import { useAdminStore } from '@/stores/admin'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()
const admin = useAdminStore()

const emit = defineEmits<{
  (e: 'update-taxes', v: { name: string; id: string }): void
}>()
</script>

<template>
  <aside class="list-networks">
    <CardCrypto
      v-for="crypto in admin.listNetworks"
      :id="crypto.id"
      :key="crypto.id"
      class="card"
      :wallet="crypto.wallet"
      :crypto="crypto?.symbol"
      :name="crypto.name"
      @update-taxes="emit('update-taxes', $event)"
    />

    <h2
      v-if="!admin.listNetworks.length"
      class="text-xl font-display font-bold mt-5/10"
    >
      Não há stablecoins no momento.
    </h2>

    <Button class="add-network" @click="ui.toggleModal('add-network')">
      <ic:round-add class="mr-4 text-xl" />
      <span>Adicionar Stablecoin</span>
    </Button>
  </aside>
</template>

<style lang="scss">
.list-networks {
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

  > .add-network {
    @apply mt-6 flex justify-center items-center w-full bg-primary-light text-white;
  }
}
</style>

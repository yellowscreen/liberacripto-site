<script lang="ts" setup>
import { useAdminStore } from '@/stores/admin'

const admin = useAdminStore()

</script>

<template>
  <aside class="list-orders-history">
    <CardCrypto
      v-for="crypto in admin.listCryptos"
      :id="crypto.id"
      :key="crypto.id"
      class="card"
      :wallet="crypto.wallet"
      :crypto="crypto.code"
      :name="crypto.name"
    />

    <h2 v-if="!admin.listCryptos.length" class="text-xl font-display font-bold  mt-5/10">
      Não há criptoativos no momento.
    </h2>

    <Button class="add-crypto">
      <ic:round-add class="mr-4 text-xl" />
      <span>Adicionar criptoativos</span>
    </Button>
  </aside>
</template>

<style lang="scss">
.list-orders-history {
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

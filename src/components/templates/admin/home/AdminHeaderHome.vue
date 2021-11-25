<script lang="ts" setup>
import type { Order } from '@/@types/admin'

type Tabs<T> = {
  label: string
  type: T
  canRender?: readonly string[]
}

defineProps<{
  currentMethod: string
  currentType: string
}>()

const emit = defineEmits<{
  (e: 'update:method', v: Order['payment_method']): void
  (e: 'update:type', v: Order['type']): void
  (e: 'search', v: string): void
}>()

const typesTabs: readonly Tabs<Order['type']>[] = readonly([
  { label: 'Compras', type: 'buy' },
  { label: 'Venda', type: 'sell' },
  { label: 'Contas pagas', type: 'payment' },
])

const methodsTabs: readonly Tabs<Order['payment_method']>[] = readonly([
  { label: 'Pix', type: 'pix', canRender: ['buy', 'sell'] },
  { label: 'Boleto', type: 'billet', canRender: ['buy', 'payment'] },
  { label: 'Transferências', type: 'transfer', canRender: ['sell'] },
  { label: 'Dólar', type: 'usd', canRender: ['buy'] },
])
</script>

<template>
  <header class="admin-header-home">
    <div class="filters-type-orders">
      <ButtonTabTypes
        v-for="tab in typesTabs"
        :key="tab.type"
        :label="tab.label"
        :type="tab.type"
        :active="currentType === tab.type"
        class="mr-2"
        @update:type="emit('update:type', $event)"
      />
    </div>

    <div class="filters">
      <ButtonTabMethod
        v-for="tab in methodsTabs"
        v-show="tab.canRender?.includes(currentType)"
        :key="tab.type"
        :label="tab.label"
        :method="tab.type"
        :active="currentMethod === tab.type"
        class="mr-2"
        @update:method="emit('update:method', $event)"
      />

      <!-- <button class="bg-cta rounded-3xl px-1 py-1">
        <mdi:filter-variant class="text-2xl" />
      </button> -->
    </div>

    <SearchAdmin class="search" placeholder="Pesquisar ordem" @search="emit('search', $event)" />
  </header>
</template>

<style lang="scss">
.admin-header-home {
  @apply flex flex-col
    px-4 pb-8
    bg-primary-light ;

    box-shadow: 1px 80px 0px 20px #004B74;

  > .filters-type-orders {
    @apply flex justify-around items-center w-full
      mb-10 mt-4;

    @screen md {
      @apply self-center max-w-600px;
    }
  }

  > .filters {
    @apply flex justify-around items-center
      w-full mb-6;

    @screen md {
      @apply self-center max-w-600px;
    }
  }

  > .search {
    @apply self-center w-full
      bg-white max-w-520px rounded-xl;
  }
}
</style>

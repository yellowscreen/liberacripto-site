<script lang="ts" setup>
import { Order } from '@/@types/admin'
import { convertNumberToCurrency } from '@/composables/useFormat'
import { useAdminStore } from '@/stores/admin'

const admin = useAdminStore()

const emit = defineEmits<{
  (e: 'orderDetails', v: Order): void
}>()

const title = computed(() =>
  `${admin.dictionary({ type: 'plural-type', text: admin.filtersUI.type })} com ${admin.dictionary({ type: 'method', text: admin.filtersUI.method })}`,
)

</script>

<template>
  <aside class="list-orders-history">
    <header class="header">
      <h2>{{ title }}</h2>
    </header>

    <CardOrder
      v-for="order in admin.listOrders"
      :key="order.id"
      class="card"
      :order-id="order.shareable_code"
      :status="order.status"
      :crypto="order.crypto"
      :translate-status="admin.dictionary({type: 'status', text:order.status})"
      :value="convertNumberToCurrency(order.value)"
      @click="emit('orderDetails', order)"
    />
  </aside>
</template>

<style lang="scss">

.list-orders-history {
  @apply flex flex-col items-center
    px-6 py-6
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
}
</style>

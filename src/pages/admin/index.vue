<route lang="yaml">
name: AdminHome

meta:
  layout: admin
  requiresAuth: true
</route>

<script lang="ts" setup>

import { useAdminStore } from '@/stores/admin'
import { useUIStore } from '@/stores/ui'

import type { Order } from '@/@types/admin'

const admin = useAdminStore()
const ui = useUIStore()

function updateMethod(method: Order['payment_method']) {
  admin.getOrdersHistory({ method, page: 1, limit: 10 })
}
function updateType(type: Order['type']) {
  admin.getOrdersHistory({ type, page: 1, limit: 10, method: type === 'payment' ? 'billet' : 'pix' })
}

function searchByCode(search: string) {
  admin.getOrdersHistory({ search })
}

const orderDetails = ref<Partial<Order>>({})

function setDataOpenModal(order: Order) {
  orderDetails.value = order
  ui.toggleModal('order-details')
}

onMounted(() => {
  admin.getOrdersHistory({ page: 1 })
})
</script>

<template>
  <section class="admin-home-page">
    <AdminHeaderHome
      class="header"
      :current-method="admin.filtersUI.method"
      :current-type="admin.filtersUI.type"
      @update:method="updateMethod"
      @update:type="updateType"
      @search="searchByCode"
    />

    <ListOrdersCard class="orders-list" @orderDetails="setDataOpenModal" />

    <ModalOrderDetails
      :order-details="orderDetails"
      @update-orders="admin.getOrdersHistory({ page: 1 })"
    />
  </section>
</template>

<style lang="scss">
.admin-home-page {
  @apply flex flex-col items-center
    w-full min-h-screen;

  > .header {
    @apply w-full;
  }

  > .orders-list {
    @apply mx-6 my-10 max-w-600px;

    width: clamp(90%, 600px, 80vw);
  }
}
</style>

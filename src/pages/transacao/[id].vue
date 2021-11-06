<route lang="yaml">
name: Transaction
</route>

<script setup lang="ts">

import { getOrderReceipt } from '@/services/order'
import { useOrderStore } from '@/stores/order'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()
const route = useRoute()
const order = useOrderStore()

useHead({

  title: 'Libera Cripto - transação',
  meta: [
    { name: 'description', content: 'Librea cripto - P2P' },

    { name: 'og:image', content: '/logo-2.png' },
    { name: 'og:title', content: 'Libera cripto - buy' },
    { name: 'og:description', content: 'P2P de cripto é na libera cripto' },
  ],
})

const summary = computed(() => order.summary)
onBeforeMount(() => {
  if (!order.summary?.shareable_code) {
    ui.toggleLoader(true)
    getOrderReceipt(route.params.id as string)
      .then(({ data }) =>
        order.setReceipt(data),
      ).finally(() => {
        ui.toggleLoader()
      })
  }
})

// function shareReceipt() {
//   if (navigator.share) {
//     navigator.share({
//       title: 'Comprovante - Libera Cripto',
//       text: summary?.value?.receipt_url,

//     }).then(d => console.log('sucesso ', d)).catch(err => console.log('nooo ', err))
//   }
//   else {
//     navigator.clipboard.writeText(summary?.value?.receipt_url)
//   }
// }
</script>

<template>
  <div class="transaction-status-page">
    <HeaderTransaction :check-pay="summary" />

    <p class="mb-6 text-left">
      Resumo da transação:
    </p>

    <ul class="summary-list">
      <li v-if="summary?.crypto" class="list-item">
        <span class="font-bold font-display">{{ summary?.crypto }}</span>
      </li>

      <li v-if="summary?.value" class="list-item">
        <span class>Valor do pagamento:</span>
        <span class="font-bold font-display">{{ summary?.value }}</span>
      </li>

      <li v-if="summary?.payment_method" class="list-item">
        <span class>Forma de pagamento:</span>
        <span class="font-bold font-display">{{ summary?.payment_method }}</span>
      </li>

      <li v-if="summary?.wallet" class="list-item">
        <span class>Wallet informada:</span>
        <span class="font-bold font-display break-all">{{ summary?.wallet }}</span>
      </li>

      <li v-if="summary?.client_email" class="list-item">
        <span class>E-mail:</span>
        <span class="font-bold font-display">{{ summary?.client_email }}</span>
      </li>

      <li v-if="summary?.extras" class="list-item">
        <span class>Informações adicionais:</span>
        <span class="font-bold font-display">{{ summary?.extras }}</span>
      </li>
    </ul>

    <!-- <footer class="footer">
      <a class="button-core -secondary text-center mb-6" :href="summary?.payable" target="_blank">
        Baixar o comprovante
      </a>

      <Button class="-primary text-fonts-primary-light bg-primary-dark" @click="shareReceipt">
        Compartilhar comprovante
      </Button>
    </footer>-->

    <FooterTransaction :check-pay="summary" />
  </div>
</template>

<style lang="scss">
.transaction-status-page {
  @apply flex flex-col items-center
    h-full pt-4;

  min-height: calc(100vh - 8rem);
  background-color: #ececec;

  > .summary-list {
    @apply flex flex-col
      px-4 py-4 mb-10 h-full
      overflow-hidden;

    background-color: #dcdcdc;
    width: clamp(290px, 80%, 80vw);
    border-radius: 8px;
  }

  > .summary-list > .list-item {
    @apply flex flex-col mb-4;
    flex-grow: 0;
    max-width: 300px;
  }
}
</style>

<route lang="yaml">
name: Transaction
</route>

<script setup lang="ts">
import { getOrderStatus } from '@/services/order'
const route = useRoute()

useHead({

  title: 'Libera Cripto - transação',
  meta: [
    { name: 'description', content: 'Librea cripto - P2P' },

    { name: 'og:image', content: '/logo-2.png' },
    { name: 'og:title', content: 'Libera cripto - buy' },
    { name: 'og:description', content: 'P2P de cripto é na libera cripto' },
  ],
})

const summary = ref({
  type: 'buy',
  payment_method: 'billet',
  crypto: 'btc',
  value: 5544,
  wallet: '0x5f10305C52c87442D213D9F7AC302CE5F92AC7Ac',
  extras: 'synthesize array',
  shareable_code: '3-T76008',
  status: 'pending',
  created_at: '2021-10-16T22:05:21.449+00:00',
  updated_at: '2021-10-16T22:05:22.262+00:00',
  id: 18,
  payable: 'https://sandbox.asaas.com/b/pdf/7037412952907212',

})

onBeforeMount(() => {
  getOrderStatus(route.params.id as string).then(({ data }) => {
    console.log(data)
    summary.value = data
  })
})

function formatDate(date: string) {
  const parse = new Date(date)
  return Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(parse)
}

</script>

<template>
  <div class="transaction-status-page">
    <header class="header">
      <ic:round-check-circle class="text-green-600 h-8 w-8 mb-4" />
      <h1 class="title">
        Transação realizada
      </h1>

      <div class="status-card">
        <p>Status da transação:</p>
        <strong>Aguardando compensação</strong>
      </div>

      <section class="infos">
        <p>
          Data da transação:
          <strong>{{ formatDate(summary.updated_at) }}</strong>
        </p>
        <p>
          Código do pedido:
          <strong>#32434423d</strong>
        </p>
      </section>
    </header>

    <p class="mb-6">
      Resumo da transação
    </p>

    <ul class="summary-list">
      <li v-if="summary?.crypto" class="list-item">
        <span class>Cripto escolhida:</span>
        <span class="font-bold">{{ summary.crypto }}</span>
      </li>

      <li v-if="summary?.value" class="list-item">
        <span class>Valor do pagamento:</span>
        <span class="font-bold">{{ summary.value }}</span>
      </li>

      <li v-if="summary?.payment_method" class="list-item">
        <span class>Forma de pagamento:</span>
        <span class="font-bold">{{ summary.payment_method }}</span>
      </li>

      <li v-if="summary?.wallet" class="list-item">
        <span class>Wallet informada:</span>
        <span class="font-bold break-all">{{ summary.wallet }}</span>
      </li>

      <li v-if="summary?.client_email" class="list-item">
        <span class>E-mail:</span>
        <span class="font-bold">{{ summary.client_email }}</span>
      </li>

      <li v-if="summary?.extras" class="list-item">
        <span class>Informações adicionais:</span>
        <span class="font-bold">{{ summary.extras }}</span>
      </li>
    </ul>

    <footer>
      <Button class="-secondary">
        Baixar o comprovante
      </Button>
    </footer>
  </div>
</template>

<style lang="scss">
.transaction-status-page {
  @apply flex flex-col items-center
    h-full
    pt-4  ;

  min-height: calc(100vh - 8rem);

  > .header {
    @apply flex flex-col items-center w-full
      pb-10 mx-8;

    border-bottom: 2px solid #484848;

    > .title {
      @apply inline-block w-8/12  font-bold text-2xl mb-2;
    }

    > .status-card {
      @apply px-4 py-4 mb-10 rounded-md bg-gray-300;
    }

    > .infos {
      @apply flex flex-col items-center;
    }
  }

  > .summary-list {
    @apply flex flex-col
      px-4 py-4 mb-10 h-full
      overflow-hidden;

    border-radius: 8px;
    background-color: #484848;
    color: white;
  }

  > .summary-list > .list-item {
    @apply flex flex-col mb-4;
    flex-grow: 0;
    max-width: 300px;
  }
}
</style>

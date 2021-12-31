<route lang="yaml">
name: Transaction
</route>

<script setup lang="ts">

import { useCryptosStore } from '@stores/cryptos'
import { getOrderReceipt, getS3Credentials, patchReceiptOrder, postUploadReceipt } from '@/services/order'
import { useOrderStore } from '@/stores/order'
import { useUIStore } from '@/stores/ui'
import { showSnackbar } from '@/composables/useSnackbar'

const ui = useUIStore()
const route = useRoute()
const router = useRouter()
const order = useOrderStore()
const crypto = useCryptosStore()



useHead({
  title: 'Libera Cripto - Transação',
  meta: [
    { name: 'description', content: 'Libera cripto' },

    { name: 'og:image', content: 'https://www.liberacripto.com.br/logo.png' },
    { name: 'og:title', content: 'Libera cripto - Transação' },
    {
      property: 'og:url',
      content: 'https://www.liberacripto.com.br/',
    },
    { name: 'og:description', content: 'P2P de cripto' },
  ],
})

const dicPaymentType: any = {
  billet: 'Boleto',
  usd: 'Hash Dolar',
  pix: 'Pix',
  transfer: 'Transferência',
}

const summary = computed(() => order.summary)
const paymentValueFormatted = computed(() => Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(Number(summary?.value?.value)) ?? '')
const paymentMethodFormatted = computed(() => dicPaymentType[summary.value?.payment_method] ?? dicPaymentType.billet)

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

function mapText(dict: any[], value: string, key: string) {
  return dict.find(element => RegExp(value).test(element[key]))?.name ?? value
}

async function fetchOrder() {
  const inpt = document.querySelector('input[type="file"]') as HTMLInputElement
  const file = inpt.files?.[0]

  if (file) {
    try {
      const extension = file.name.split('.').pop()
      ui.toggleLoader(true)
      const { data } = await getS3Credentials(extension as string)
      const { fields, url } = data

      if (fields.Policy) {
        const { headers } = await postUploadReceipt(fields, url, file)
        const receiptUrl = headers?.location ?? headers?.Location

        await patchReceiptOrder(summary.value?.id, receiptUrl)
        showSnackbar({ title: 'Comprovante enviado com sucesso!', type: 'success' })
        router.push(`/transacao/${summary?.value?.shareable_code}`)
      }
    }
    catch (er) {
      inpt.value = ''
      showSnackbar({ title: 'Ocorreu um erro ao enviar o comprovante', type: 'danger' })
    }
    finally {
      ui.toggleLoader()
    }
  }
  // !! Remover
  else {
    await patchReceiptOrder(summary.value?.id, 'https://s3.us-east-1.amazonaws.com/bucketeer-f6f01578-f150-4007-8d42-961cc3fbdae2/Iu3_gWNz7rMr8RJcNH8kQz2IDtyjny-S')
    showSnackbar({ title: 'Comprovante enviado com sucesso!', type: 'success' })

    router.push(`/transacao/${summary?.value?.shareable_code}`)
  }
}

</script>

<template>
  <div class="transaction-status-page">
    <HeaderTransaction :check-pay="summary" />

    <p class="mb-6 text-left">
      Resumo da transação:
    </p>

    <ul class="summary-list">
      <li v-if="summary?.crypto" class="list-item">
        <span
          class="font-bold font-display"
        >{{ mapText(crypto.available as any[], summary.crypto as string, 'code') }}</span>
      </li>

      <li v-if="summary?.value" class="list-item">
        <span class>Valor {{ summary.type === 'sell'? 'a receber' :'do pagamento' }}:</span>
        <span class="font-bold font-display">{{ paymentValueFormatted }}</span>
      </li>

      <li v-if="summary?.crypto_value" class="list-item">
        <span class>quantidade de cripto vendida:</span>
        <span class="font-bold font-display">
          <span class="uppercase">{{ summary.crypto }}</span>
          {{ summary.crypto_value }}</span>
      </li>

      <li v-if="summary?.payment_method" class="list-item">
        <span class>Forma de pagamento:</span>
        <span class="font-bold font-display">{{ paymentMethodFormatted }}</span>
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

    <FooterTransaction :check-pay="summary" @upload-receipt="fetchOrder" />
  </div>
</template>

<style lang="scss">
.transaction-status-page {
  @apply flex flex-col items-center
    h-full pt-4;

  min-height: calc(100vh - 8rem);
  background-color: #ececec;

  @screen md {
    max-width: 500px;
    margin: auto;
  }

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

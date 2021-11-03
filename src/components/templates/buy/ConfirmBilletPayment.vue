<script lang="ts" setup>
import { useUIStore } from '@/stores/ui'
import { getS3Credentials, postUploadReceipt, patchReceiptOrder } from '@/services/order'

import type { Summary } from '@/@types/payments'

const props = defineProps<{
  checkPay: Summary
}>()

const { t } = useI18n()
const ui = useUIStore()
const router = useRouter()

async function fetchOrder() {
  const inpt = document.querySelector('input[type="file"]') as HTMLInputElement
  const file = inpt.files?.[0]

  if (file) {
    try {
      ui.toggleLoader(true)
      const { data } = await getS3Credentials()
      const { fields, url } = data

      if (fields.Policy) {
        const { headers } = await postUploadReceipt(fields, url, file)
        const receiptUrl = headers?.location ?? headers?.Location

        await patchReceiptOrder(props.checkPay.id, receiptUrl)
        router.push(`/transacao/${props.checkPay.shareable_code}`)
      }
    }
    catch (er) {
      console.log('Oh no, A error', er)
    }
    finally {
      ui.toggleLoader()
    }
  }
  else {
    await patchReceiptOrder(props.checkPay.id, 'https://s3.us-east-1.amazonaws.com/bucketeer-f6f01578-f150-4007-8d42-961cc3fbdae2/Iu3_gWNz7rMr8RJcNH8kQz2IDtyjny-S')
    router.push(`/transacao/${props.checkPay.shareable_code}`)
  }
}
</script>

<template>
  <section class="check-pay">
    <header class="header">
      <h1 class="title">
        Pagamento
      </h1>
      <p class="value">
        Valor do pagamento:
        <span
          class="font-bold"
        >{{ Intl.NumberFormat('pt-br', { style: 'currency', currency: "BRL" }).format(checkPay.value) }}</span>
      </p>
    </header>

    <section class="step-payment">
      <h2 class="step-title">
        Passo 1: Efetue o pagamento
      </h2>
      <!-- Não retorna por hora -->
      <!-- <Clipboard class="code" code="" /> -->

      <a
        target="_blank"
        :href="checkPay.payable"
        class="button-core flex justify-center bg-blue-900 text-white mb-4"
      >{{ t('buy.pay-check.billet.download') }}</a>
    </section>

    <section class="step-payment">
      <h2 class="step-title">
        Passo 2: Anexo o comprovante
      </h2>

      <FileUpload class="mb-6" />
      <ShareOrderCode class="transaction-code" :code="checkPay?.shareable_code" />

      <footer class="flex justify-between w-full mt-8">
        <Button class="-link" @click="() => { }">
          Editar dados
        </Button>

        <Button class="bg-gray-400 text-gray-700" @click="fetchOrder">
          Confirmar pagamento
        </Button>
      </footer>
    </section>
  </section>
</template>

<style lang="scss">
.check-pay {
  @apply flex flex-col mx-8;

  > .header {
    @apply mb-8;

    > .title {
      @apply text-left font-bold text-2xl mb-1;
    }
  }

  > .step-payment {
    @apply flex flex-col justify-center;

    &:first-of-type {
      border-bottom: 2px solid #404040;
      margin-bottom: 32px;
    }

    > .step-title {
      @apply text-xs text-blue-900 font-bold mb-8;
    }

    > .code {
      @apply mb-4;
    }

    > .transaction-code {
      margin-bottom: calc(16px + 1rem);
    }
  }
}
</style>

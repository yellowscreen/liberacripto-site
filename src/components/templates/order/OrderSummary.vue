<script lang="ts" setup>
import { patchReceiptOrder } from '@/services/order'
import { showSnackbar } from '@/composables/useSnackbar'

import { uploadFileToS3 } from '@/composables/useUploadS3File'

import type { Summary } from '@/@types/payments'

const props = defineProps<{
  checkPay: Summary
}>()

const emit = defineEmits<{
  (e: 'goback'): void
}>()

const router = useRouter()

const dicPayment: Record<Summary['payment_method'], string> = {
  boleto: 'Fazer download do boleto',
  pix: 'Fazer download da fatura',
}

const isHashtokenToPay = computed(() => {
  if (props.checkPay.type === 'buy')
    return ['usd'].includes(props.checkPay.payment_method)
  else if (props.checkPay.type === 'sell')
    return ['pix', 'transfer'].includes(props.checkPay.payment_method)

  return false
})
const buttonDownloadText = computed(() => dicPayment[props.checkPay.payment_method] ?? dicPayment.boleto)
const paymentValueFormatted = computed(() => Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(props.checkPay.value))

async function fetchOrder() {
  const { receiptUrl } = await uploadFileToS3()

  await patchReceiptOrder(props.checkPay.id, receiptUrl)
  showSnackbar({ title: 'Comprovante enviado com sucesso!', type: 'success' })
  router.push(`/transacao/${props.checkPay.shareable_code}`)
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
        <span class="font-bold">{{ paymentValueFormatted }}</span>
      </p>
    </header>

    <section class="step-payment">
      <h2 class="step-title">
        Passo 1: Efetue o pagamento
      </h2>

      <Clipboard v-if="isHashtokenToPay" label="Hash da wallet libera cripto" :code="checkPay.payable" class="mb-4" />
      <a
        v-else
        target="_blank"
        :href="checkPay.payable"
        class="button-core flex justify-center bg-primary-dark text-fonts-primary-light mb-4"
      >{{ buttonDownloadText }}</a>
    </section>

    <section class="step-payment">
      <h2 class="step-title">
        Passo 2: Anexo o comprovante
      </h2>

      <FileUpload class="mb-6" />
      <ShareOrderCode class="transaction-code" :code="checkPay?.shareable_code" />

      <footer class="footer">
        <Button class="btn -link" @click="emit('goback')">
          Cancelar
        </Button>

        <Button class="btn" @click="fetchOrder">
          Confirmar pagamento
        </Button>
      </footer>
    </section>
  </section>
</template>

<style lang="scss">
.check-pay {
  @apply flex flex-col mx-4;

  min-width: 280px;

  @screen md {
    max-width: 400px;
    width: 100%;
  }

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
      @apply text-xs text-stroke-fonts-secondary-light font-bold mb-8;
    }

    > .code {
      @apply mb-4;
    }

    > .transaction-code {
      margin-bottom: calc(16px + 1rem);
    }

    > .footer {
      @apply flex justify-between w-full mt-8 mb-6;

      > .btn:first-of-type {
        margin-left: -1rem;
      }

      .btn:last-of-type {
        @apply bg-primary-dark text-fonts-primary-light;
        margin-right: -1rem;
      }
    }
  }
}
</style>

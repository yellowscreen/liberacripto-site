<script setup lang="ts">
import type { Summary } from '@/@types/payments'

type DictionaryPayment = Record<Summary['payment_method'], string>

const props = defineProps<{
  checkPay: Summary
}>()

const emit = defineEmits<{
  (e: 'uploadReceipt'): void
}>()

const isHashtokenToPay = computed(() => {
  if (props.checkPay.type === 'buy')
    return ['usd'].includes(props.checkPay.payment_method)
  else if (props.checkPay.type === 'sell')
    return ['pix', 'transfer'].includes(props.checkPay.payment_method)

  return false
})

const dicPayment: DictionaryPayment = {
  boleto: 'Fazer download do boleto',
  pix: 'Fazer download da fatura',
}

const buttonDownloadText = computed(() => dicPayment[props.checkPay.payment_method] ?? dicPayment.boleto)

function shareReceipt() {
  if (navigator.share) {
    navigator.share({
      title: 'Comprovante - Libera Cripto',
      text: props.checkPay?.receipt_url,

    }).then(d => console.log('sucesso ', d)).catch(err => console.log('nooo ', err))
  }
  else {
    navigator.clipboard.writeText(props.checkPay?.receipt_url ?? 'codigo inválido')
  }
}

</script>

<template>
  <footer v-if="checkPay.status === 'finished'" class="footer-transaction">
    <a
      class="button-core -secondary text-center mb-6"
      :href="checkPay?.payable"
      target="_blank"
    >Baixar o comprovante</a>

    <Button
      class="-primary text-fonts-primary-light bg-primary-dark"
      @click="shareReceipt"
    >
      Compartilhar comprovante
    </Button>
  </footer>
  <footer v-if="checkPay.status === 'pending'" class="footer-transaction">
    <h2 class="title">
      Pagamento
    </h2>

    <Clipboard v-if="isHashtokenToPay" label="Hash da wallet libera cripto" :code="checkPay.payable" class="mb-14" />

    <a
      v-else
      target="_blank"
      :href="checkPay.payable"
      class="button-core download-link"
    >{{ buttonDownloadText }}</a>
    <ShareOrderCode class="mb-14" :code="checkPay?.shareable_code" />

    <FileUpload class="mb-10" />

    <Button class=" bg-primary-dark text-fonts-primary-light" @click="emit('uploadReceipt')">
      Confirmar pagamento
    </Button>
  </footer>
</template>

<style setup lang="scss">
.footer-transaction {
  @apply flex flex-col justify-center
    min-w-76 mb-12;

  > .title {
    @apply font-display text-xl font-bold
      mb-8;
  }

  > .download-link {
    @apply flex justify-center bg-primary-dark text-fonts-primary-light mb-4;
  }
}
</style>

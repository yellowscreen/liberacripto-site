<route lang="yaml">
name: Pix
meta:
  layout: default
</route>

<script setup lang="ts">
import type { Pix } from '@/@types/payments'

useHead({
  title: 'Libera Cripto - Pix',
  meta: [
    { name: 'description', content: 'Librea cripto - P2P' },

    { name: 'og:image', content: '/logo-2.png' },
    { name: 'og:title', content: 'Libera cripto - buy' },
    { name: 'og:description', content: 'P2P de cripto é na libera cripto' },
  ],
})

const { t } = useI18n()

const step = ref(0)
const pixPay = ref<Partial<Pix>>({})

function setPix(d: Pix) {
  pixPay.value = d
  step.value++
}
</script>

<template>
  <div class="buy-page">
    <h1 class="title">
      Comprar com PIX
    </h1>

    <small class="step">{{ t('buy.index.step') }} {{ 2 + step }} de 4</small>

    <BuyWithPix v-show="step === 0" class="form" @user="setPix" />

    <ConfirmDatas :payment="{ ...pixPay, method: 'Pix' }" :is-show="step > 0">
      <footer class="flex justify-between mt-8">
        <Button class="-link" @click="step -= 1">
          Editar dados
        </Button>

        <Button class="bg-gray-400 text-gray-700">
          Confirmar pagamento
        </Button>
      </footer>
    </ConfirmDatas>
  </div>
</template>

<style lang="scss">
.buy-page {
  @apply flex flex-col items-center
    pt-8 bg-gray-200;

  min-height: calc(100vh - 8rem);

  > .title {
    @apply inline-block w-8/12  font-bold text-2xl mb-2;
  }

  > .step {
    @apply inline-block w-8/12  mb-4;
  }

  > .form {
    @apply max-w-8/12;
  }
}
</style>

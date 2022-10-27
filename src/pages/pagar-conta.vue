<route lang="yaml">
name: PayABill
</route>

<script setup lang="ts">
import { useOrderStore } from '@stores/order'
// import { useCryptosStore } from '@stores/cryptos'

// import { STEP_TO_BUY } from '@/@types/payments'
// import ButtonBack from '@/components/molecules/button/ButtonBack.vue'

// type StepToBuyKeys = keyof typeof STEP_TO_BUY

// const route = useRoute()
// const router = useRouter()
const order = useOrderStore()
// const crypto = useCryptosStore()

useHead({
  title: 'Libera Cripto - Pagar uma conta',
  meta: [
    { name: 'description', content: 'Libera cripto' },

    { name: 'og:image', content: 'https://www.liberacripto.com.br/logo.png' },
    { name: 'og:title', content: 'Libera cripto - Pagar uma conta' },
    {
      property: 'og:url',
      content: 'https://www.liberacripto.com.br/',
    },
    { name: 'og:description', content: 'P2P de cripto' },
  ],
})

// function isCurrentStep(currentStep: StepToBuyKeys) {
//   return order.step === currentStep
// }

// function fetchOrder() {
//   order.fetchStorePaymentOrder()
// }

// function goBack() {
//   order.goBackStep(router, 'SellMethod')
//   router.push('/')
// }

onMounted(() => {
  order.setCurrentStep('PAYMENT')
})
</script>

<template>
  <div class="order-sell-page">

    <div class="maintenance">
      Serviço em manutenção
    </div>
    <!-- <section class="header">
      <ButtonBack class="ml-[-8px]" @click="goBack" />
      <Chip :current="order.currentStepPosition + 1" />
    </section>

    <FormOrderPayABill
      v-show="isCurrentStep('PAYMENT')"
      class="form"
      :title="route.params.method"
      @next="order.setCurrentStep('SUMMARY')"
    />

    <ConfirmOrderData
      :payment="order.pay"
      :cryptos="crypto.available"
      :is-show="isCurrentStep('SUMMARY')"
    >
      <footer class="flex justify-between my-8 w-full">
        <Button class="-link" @click="goBack">
          Editar dados
        </Button>

        <Button class="bg-primary-dark text-white" @click="fetchOrder">
          Confirmar
        </Button>
      </footer>
    </ConfirmOrderData>

    <OrderSummary
      v-if="isCurrentStep('CHECK_PAY')"
      :check-pay="order.summary"
      @goback="goBack"
    /> -->

  </div>
</template>

<style lang="scss">
.order-sell-page {
  @apply flex flex-col items-center
    pt-4;

  min-height: calc(100vh - 8rem);

  @screen md {
    margin: auto;
    max-width: 600px;
    @apply self-center justify-self-center;
  }

  > .header {
    @apply flex w-full justify-between items-center px-4 mb-8;

    @screen md {
      @apply px-0;
    }
  }

  > .step {
    @apply inline-block w-8/12  mb-4;
  }

  > .form {
    width: clamp(260px, 80%, 500px);
  }
}

.maintenance {
  @apply text-center text-fonts-secondary-light text-2xl flex justify-center items-center h-[500px];	
}

</style>

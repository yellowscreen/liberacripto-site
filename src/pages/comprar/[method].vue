<route lang="yaml">
name: BuyOrder
meta:
  layout: default
</route>

<script setup lang="ts">
import { useOrderStore } from '@stores/order'
import { useCryptosStore } from '@stores/cryptos'

import { STEP_TO_BUY } from '@/@types/payments'
import ButtonBack from '@/components/molecules/button/ButtonBack.vue'

type StepToBuyKeys = keyof typeof STEP_TO_BUY

const route = useRoute()
const router = useRouter()
const order = useOrderStore()
const crypto = useCryptosStore()

useHead({

  title: `Libera Cripto - ${route.params.method}`,
  meta: [
    { name: 'description', content: 'Librea cripto - P2P' },

    { name: 'og:image', content: '/logo-2.png' },
    { name: 'og:title', content: 'Libera cripto - buy' },
    { name: 'og:description', content: 'P2P de cripto é na libera cripto' },
  ],
})

function isCurrentStep(currentStep: StepToBuyKeys) {
  return order.step === currentStep
}

function fetchOrder() {
  order.fetchStoreBuyOrder()
}

function goBack() {
  order.goBackStep(router)
}

onMounted(() => {
  order.setCurrentStep('PAYMENT')
})
</script>

<template>
  <div class="order-page">
    <section class="flex w-full justify-between items-center px-4 mb-8">
      <ButtonBack class="ml-[-8px]" @click="goBack" />
      <Chip :current="order.currentStepPosition + 1" />
    </section>

    <FormOrderBuy
      v-show="isCurrentStep('PAYMENT')"
      class="form"
      :title="route.params.method"
      @next="order.setCurrentStep('SUMMARY')"
    />

    <ConfirmUserData
      :payment="order.buy"
      :networks="order.networks"
      :cryptos="crypto.available"
      :is-show="isCurrentStep('SUMMARY')"
    >
      <footer class="flex justify-between my-8 w-full">
        <Button class="-link" @click="goBack">
          Editar dados
        </Button>

        <Button class="bg-primary-dark text-white" @click="fetchOrder">
          Confirmar pagamento
        </Button>
      </footer>
    </ConfirmUserData>

    <ConfirmBilletPayment v-if="isCurrentStep('CHECK_PAY')" :check-pay="order.summary" @goback="goBack" />
  </div>
</template>

<style lang="scss">
.order-page {
  @apply flex flex-col items-center
    pt-4;

  min-height: calc(100vh - 8rem);

  @screen md {
    margin: auto;
    max-width: 500px;
    @apply self-center justify-self-center;
  }

  > .step {
    @apply inline-block w-8/12  mb-4;

  }

  > .form {
    @apply max-w-8/12;

    @screen md {
      max-width: 480px;
    }
  }
}
</style>

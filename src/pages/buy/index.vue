<route lang="yaml">
name: Buy
meta:
  layout: default
</route>

<script setup lang="ts">
import { useCryptosStore } from '@stores/cryptos'

useHead({
  title: 'Libera Cripto - Comprar cripto',
  meta: [
    { name: 'description', content: 'Librea cripto - P2P' },

    { name: 'og:image', content: '/logo-2.png' },
    { name: 'og:title', content: 'Libera cripto - buy' },
    { name: 'og:description', content: 'P2P de cripto é na libera cripto' },
  ],
})

const { t } = useI18n()
const router = useRouter()

const crypto = useCryptosStore()

onMounted(() => {
  crypto.$state.availables.forEach(({ id }) => {
    crypto.storeCrypto(id)
  })
})
</script>

<template>
  <div class="buy-page">
    <h1 class="title">
      {{ t('buy.index.title') }}
    </h1>

    <small class="step">{{ t('buy.index.step') }} 1 de 3</small>

    <p class="payment">
      {{ t('buy.index.payment') }}
    </p>

    <ul class="payment-methods">
      <li class="method">
        <Button class="button-pay">
          {{ t('buy.index.methods.boleto') }}
        </Button>
      </li>

      <li class="method">
        <Button class="button-pay" @click="router.push({ name: 'Pix' })">
          {{ t('buy.index.methods.pix') }}
        </Button>
      </li>

      <li class="method">
        <Button class="button-pay">
          {{ t('buy.index.methods.buck') }}
        </Button>
      </li>
    </ul>

    <Link class="goback" :to="{ name: 'Home' }">
      {{ t('buy.index.back') }}
    </Link>
  </div>
</template>

<style lang="scss">
.buy-page {
  @apply flex flex-col items-center
    pt-16 bg-gray-200;

  min-height: calc(100vh - 8rem);

  > .title {
    @apply font-bold text-2xl mb-5;
  }

  > .step {
    @apply mb-8;
  }

  > .payment {
    @apply text-sm mb-5;
  }

  > .payment-methods {
    @apply w-full max-w-61;

    > .method {
      @apply mb-6;
    }

    > .method > .button-pay {
      @apply w-full
        bg-dark-500 text-gray-300;
    }
  }
}
</style>

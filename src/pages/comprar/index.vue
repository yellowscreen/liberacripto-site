<route lang="yaml">
name: BuyMethod
meta:
  layout: default
</route>

<script setup lang="ts">
import { useCryptosStore } from "@stores/cryptos";

useHead({
  title: "Libera Cripto - Comprar crypto",
  meta: [
    { name: "description", content: "Libera cripto" },

    { name: "og:image", content: "https://www.liberacripto.com.br/logo.png" },
    { name: "og:title", content: "Libera cripto - Comprar crypto" },
    {
      property: "og:url",
      content: "https://www.liberacripto.com.br/",
    },
    { name: "og:description", content: "P2P de cripto" },
  ],
});

const router = useRouter();

const crypto = useCryptosStore();

onMounted(() => {
  crypto.storeCryptosAvailable();
});

function goToBuyOrder(method: string) {
  router.push({ name: "BuyOrder", params: { method } });
}
</script>

<template>
  <div class="buy-page">
    <Chip class="step" :current="1" />

    <h1 class="title">Compre Cripto</h1>

    <p class="subtitle">Escolha seu método de Pagamento</p>

    <ul class="payment-methods">
      <li class="method">
        <Button class="button-pay" @click="goToBuyOrder('boleto')"> Boleto </Button>
      </li>

      <li class="method">
        <Button class="button-pay" @click="goToBuyOrder('pix')">
          Pix
        </Button>
      </li>

      <!-- <li class="method">
        <Button class="button-pay" @click="goToBuyOrder('dolar')">
          Dólar
        </Button>
      </li> -->
    </ul>

    <Link class="mb-10" :to="{ name: 'Home' }"> Voltar para página inicial </Link>
  </div>
</template>

<style lang="scss">
.buy-page {
  @apply flex flex-col items-center
    pt-14 bg-secondary-light;

  min-height: calc(100vh - 8rem);

  > .step {
    @apply mb-16;
  }

  > .title {
    @apply font-display font-bold text-2xl mb-3;
  }

  > .subtitle {
    @apply text-sm mb-5;
  }

  > .payment-methods {
    @apply w-full max-w-61 mb-20;

    > .method {
      @apply mb-6;

      > .button-pay {
        @apply w-full
        bg-primary-dark text-gray-300;
      }
    }
  }
}
</style>

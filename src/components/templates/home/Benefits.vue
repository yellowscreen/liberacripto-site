<script setup lang="ts">
const { t } = useI18n()

const router = useRouter()
</script>

<template>
  <section class="benefits-home">
    <ul class="cards">
      <li class="item">
        <CardTrade class="card" @click="router.push({ name: 'BuyMethod' })">
          <template #icon>
            <mdi:cart class="text-cta" width="32" height="32" />
          </template>

          <h2 class="label">
            Comprar
            <span class="-small">Criptomoedas</span>
          </h2>
        </CardTrade>
      </li>

      <li class="item">
        <CardTrade class="card">
          <template #icon>
            <ic:baseline-sell class="text-cta" width="32" height="32" />
          </template>

          <h2 class="label">
            Venda
            <span class="-small">Criptomoedas</span>
          </h2>
        </CardTrade>
      </li>

      <li class="item">
        <CardTrade class="card">
          <template #icon>
            <mdi:receipt class="text-cta" width="32" height="32" />
          </template>

          <h2 class="label flex flex-col">
            Pagar uma conta
            <span class="-small mt-2">com Criptomoedas</span>
          </h2>
        </CardTrade>
      </li>
    </ul>

    <section class="cryptocoins">
      <div class="coins" aria-hidden="true">
        <div class="coin"></div>
        <div class="coin"></div>
      </div>

      <p class="text">
        <span>
          Compre, venda ou pague contas
        </span>
        <span class="font-thin text-base text-fonts-secondary-light">com Cripmoedas de forma anônima</span>
      </p>
    </section>

    <h2 class="title">
      Benefícios da plataforma
    </h2>

    <strong class="benefit-item">{{ t('home.benefits.subtitle') }}</strong>
    <strong class="benefit-item">{{ t('home.benefits.subtitle') }}</strong>
    <strong class="benefit-item">{{ t('home.benefits.subtitle') }}</strong>

    <Button class="bg-cta w-6/10 self-center ">
      Ver todas as taxas
    </Button>
  </section>
</template>

<style lang="scss">
.benefits-home {
  @apply flex flex-col relative
    px-6 pt-8 pb-32 overflow-x-hidden
    bg-secondary-darkest;

  > .cards {
    @apply grid grid-cols-2
      mb-24;

    gap: 8px;
    z-index: 1;
  }

  > .cards > .item:last-of-type {
    @apply col-span-2;

    > .card {
      @apply w-full;
    }
  }

  > .cryptocoins {
    display: flex;
    margin-bottom: 60px;

    &::before {
      content: "";
      position: absolute;
      display: inline-block;

      bottom: 45%;
      left: -40%;

      width: 160vw;
      height: 240px;
      background-color: #1c252b;

      transform: rotate(333deg) scale(1.2)  translateY(150px);
      z-index: 0;
    }

    .text {
      @apply flex flex-col font-display
      font-bold text-xl text-fonts-primary-light;
      z-index: 1;
      max-width: 180px;
    }

    > .coins {
      position: relative;
      flex-shrink: 0;

      height: 100px;
      width: 100px;

      > .coin {
        position: absolute;
        background-image: url("/btc.png");
        background-size: contain;

        height: 88px;
        width: 88px;

        &:first-of-type {
          left: -40%;
          top: -30%;
          transform: scale(0.8);
        }
      }
    }
  }

  > .title {
    @apply font-bold font-display text-fonts-primary-light text-3xl
      mb-6 mx-auto;
    max-width: 220px;
    z-index: 1;
  }

  > .benefit-item {
    @apply flex justify-center items-center
      mb-6
      font-thin text-fonts-secondary-light;
    z-index: 1;

    &::before {
      content: "";
      border-radius: 50%;
      border: 1px solid;

      @apply inline-block h-8 w-8 mr-12 border-cta;
    }

    &:last-of-type {
      margin-bottom: 60px;
    }
  }
}
</style>

<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <section class="benefits-home">
    <ul class="cards">
      <li class="item">
        <CardTrade class="card" @click="router.push({ name: 'BuyMethod' })">
          <template #icon>
            <mdi:cart class="text-cta" />
          </template>

          <h2 class="label">
            Comprar
            <span class="-small">Criptomoedas</span>
          </h2>
        </CardTrade>
      </li>

      <li class="item">
        <CardTrade class="card" @click="router.push({ name: 'SellMethod' })">
          <template #icon>
            <ic:baseline-sell class="text-cta" />
          </template>

          <h2 class="label">
            Venda
            <span class="-small">Criptomoedas</span>
          </h2>
        </CardTrade>
      </li>

      <li class="item">
        <CardTrade class="card" @click="router.push({ name: 'PayABill' })">
          <template #icon>
            <mdi:receipt class="text-cta" />
          </template>

          <h2 class="label flex flex-col">
            Pagar
            <span class="md:hidden">uma conta</span>
            <span class="hidden md:inline-block">Contas</span>
            <span class="-small mt-2">
              com Criptomoedas
            </span>
          </h2>
        </CardTrade>
      </li>
    </ul>

    <section class="cryptocoins">
      <div class="coins" aria-hidden="true">
        <div class="coin"></div>
        <div class="coin"></div>
      </div>

      <img class="coins-desk" src="/bitcoins.png" alt="imagem-bitcoin" />

      <p class="text">
        <span>Compre, venda ou pague contas</span>
        <span
          class="font-thin text-base md:text-3xl text-fonts-secondary-light"
        >com Cripmoedas de forma anônima</span>
      </p>
    </section>

    <div class="benefits">
      <div class="container-benefit">
        <h2 class="title">
          Benefícios da plataforma
        </h2>

        <!-- <Button class="bg-cta w-256px self-start hidden md:flex justify-center">
          Ver todas as taxas
        </Button> -->
      </div>

      <div class="benefit-items">
        <strong class="benefit-item">Tudo de forma anônima!</strong>
        <strong class="benefit-item">Melhores taxas!</strong>
        <strong class="benefit-item">Simples de Usar!</strong>
      </div>
    </div>

    <!-- <Button class="bg-cta w-6/10 self-center md:hidden">
      Ver todas as taxas
    </Button> -->
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

    @screen md {
      grid-template-columns: repeat(3, 282px);
      height: 360px;
      justify-content: center;
    }
  }

  > .cards > .item > .card {
    @screen md {
      height: 360px;
    }
  }

  > .cards > .item:last-of-type {
    @apply col-span-2 md:col-auto;

    > .card {
      @apply w-full;
    }
  }

  > .cryptocoins {
    display: flex;
    margin-bottom: 60px;

    @screen md {
      @apply justify-center;
    }

    &::before {
      // content: "";
      position: absolute;
      display: inline-block;

      bottom: 45%;
      left: -40%;

      width: 160vw;
      height: 240px;
      background-color: #1c252b;

      transform: rotate(333deg) scale(1.2) translateY(150px);
      z-index: 0;
    }

    .text {
      @apply flex flex-col font-display
      font-bold text-xl text-fonts-primary-light;
      z-index: 1;
      max-width: 180px;

      @screen md {
        font-size: 37px;
        line-height: 50px;
        max-width: 333px;
      }
    }

    > .coins {
      position: relative;
      flex-shrink: 0;

      height: 100px;
      width: 100px;

      @screen md {
        display: none;
        width: 248px;
        height: 248px;
        margin-right: 32px;
      }

      > .coin {
        position: absolute;
        background-image: url("/btc.png");
        background-size: contain;

        height: 88px;
        width: 88px;

        @screen md {
          width: 248px;
          height: 248px;
        }

        &:first-of-type {
          left: -40%;
          top: -30%;
          transform: scale(0.8);
        }
      }
    }

    > .coins-desk {
      display: none;

      @screen md {
        display: block;
        width: 248px;
        height: 248px;
        margin-right: 32px;
      }
    }
  }

  > .benefits {
    @screen md {
      @apply flex  justify-center;
    }

    > .container-benefit {
      @screen md {
        @apply flex flex-col;

        width: 333px;
        margin-right: 120px;
      }
    }

    > .container-benefit > .title {
      @apply font-bold font-display text-fonts-primary-light text-3xl
      mx-auto;

      margin-bottom: 70px;
      max-width: 220px;
      z-index: 1;

      @screen md {
        margin-bottom: 78px;

        max-width: 333px;
        font-size: 47px;
        line-height: 57px;
      }
    }

    > .benefit-items {
      @screen md {
        @apply flex flex-col;
      }
    }

    > .benefit-items > .benefit-item {
      @apply flex items-center
      mb-6
      font-thin text-fonts-secondary-light;
      z-index: 1;

      &::before {
        content: "";
        border-radius: 50%;
        border: 1px solid;

        @apply inline-block h-8 w-8 mr-4 border-cta;
      }

      &:last-of-type {
        margin-bottom: 60px;
      }
    }
  }
}
</style>

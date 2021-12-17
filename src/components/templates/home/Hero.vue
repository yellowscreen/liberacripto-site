<script setup lang="ts">

const router = useRouter()
</script>

<template>
  <section class="hero-home">
    <div class="hero-container">
      <h1 class="title">
        As melhores taxas num só lugar
      </h1>

      <Button class="cta-desktop" @click="router.push({ name: 'BuyMethod' })">
        Quero comprar
      </Button>
    </div>

    <p class="description">
      Junte-se à plataforma que reconhece a liberdade.
    </p>

    <Button class="cta" @click="router.push({ name: 'BuyMethod' })">
      Quero comprar
    </Button>
  </section>
</template>

<style lang="scss">
.hero-home {
  @apply flex flex-col items-center relative
    px-8 pt-8   overflow-x-hidden
  bg-secondary-darkest h-full;

  @screen md {
    @apply flex-row justify-center;
  }

  &::before {
    // content: "";
    position: absolute;
    display: inline-block;

    bottom: 0;

    width: 100vw;
    height: 240px;
    background-color: #1c252b;

    transform: rotate(24deg) scale(1.2) translateY(-25%);
    z-index: 0;
  }

  > .hero-container > .title {
    @apply text-3xl font-bold mt-10 mb-10
      max-w-70 font-display
    text-fonts-primary-light;

    @screen md {
      @apply max-w-430px text-47px mr-40;
    }

    z-index: 1;
  }
  > .hero-container > .cta-desktop {
    @apply hidden bg-cta px-10 mb-10 md:flex w-286px justify-center;
    z-index: 1;
  }

  > .description {
    @apply mx-10 mb-16 text-fonts-secondary-light
      md:max-w-280px md:text-2xl;
    z-index: 1;
  }

  > .cta {
    @apply bg-cta px-10 mb-10 md:hidden;
    z-index: 1;
  }
}
</style>

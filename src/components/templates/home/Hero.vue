<script setup lang="ts">

const router = useRouter()
</script>

<template>
  <section class="hero-home">
    <h1 class="title">
      As melhores taxas num só lugar
    </h1>

    <p class="description">
      simply dummy text of the printing and typesetting industry.
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

  > .title {
    @apply text-3xl font-bold mt-10 mb-10
      max-w-70 font-display
    text-fonts-primary-light;

    z-index: 1;
  }

  > .description {
    @apply mx-10 mb-16 text-fonts-secondary-light;
    z-index: 1;
  }

  > .cta {
    @apply bg-cta px-10 mb-10;
    z-index: 1;
  }
}
</style>

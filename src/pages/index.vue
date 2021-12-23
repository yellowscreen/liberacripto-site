<route lang="yaml">
name: Home
meta:
  layout: default
</route>

<script setup lang="ts">
useHead({
  title: 'Libera Cripto - Home',
  meta: [
    { name: 'description', content: 'Libera cripto' },

    { name: 'og:image', content: 'https://www.liberacripto.com.br/logo.svg' },
    { name: 'og:title', content: 'Libera cripto - homepage' },
    {
      property: 'og:url',
      content: 'https://www.liberacripto.com.br/',
    },
    { name: 'og:description', content: 'P2P de cripto' },
  ],
})
</script>

<template>
  <div class="home-page">
    <Hero />

    <Benefits />

    <!-- <Terms /> -->
  </div>
</template>

<style lang="scss">
.home-page {
  @apply bg-secondary-darkest;
}
</style>

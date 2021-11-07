<route lang="yaml">
name: Home
meta:
  layout: default
</route>

<script setup lang="ts">
useHead({
  title: 'Libera Cripto - Home',
  meta: [
    { name: 'description', content: 'Librea cripto' },

    { name: 'og:image', content: '/logo.png' },
    { name: 'og:title', content: 'Libera cripto - homepage' },
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

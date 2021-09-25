<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="hero-home">
    <h1 class="title">
      {{ t('home.hero.title') }}
    </h1>

    <p class="description">
      {{ t('home.hero.text') }}
    </p>
  </section>
</template>

<style lang="scss">
.hero-home {
  @apply bg-gray-300
  px-6 pt-8 pb-32;

  background-color: #e2e2e2;

  > .title {
    @apply text-2xl font-bold mb-4;
  }

  > .description {
    @apply w-10/12;
  }
}
</style>

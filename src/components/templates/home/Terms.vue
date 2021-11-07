<script setup lang="ts">

const { t } = useI18n()

</script>

<template>
  <section class="home-terms">
    <h2 class="title">
      {{ t('home.terms.title') }}
    </h2>

    <p class="text">
      {{ t('home.terms.text') }}
    </p>

    <Button class="action" aria-label="Ver mais">
      Ver mais
    </Button>
  </section>
</template>

<style lang="scss">
.home-terms {
  @apply px-14 pt-10;
  background-color: #e2e2e2;

  > .title {
    @apply text-2xl font-bold mb-8;
  }

  > .text {
    @apply mb-10;
  }

  > .action {
    @apply w-full bg-gray-600 text-gray-50 mb-10;
  }
}
</style>

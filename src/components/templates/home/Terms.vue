<script setup lang="ts">
import { getCurrency } from '@/services/currencies'

const { t } = useI18n()

function see() {
  getCurrency('bitcoin')
    .then(({ data }) => console.log(data, 'ok'))
    .catch(er => console.log(er, 'err'))
}
</script>

<template>
  <section class="home-terms">
    <h2 class="title">
      {{ t('home.terms.title') }}
    </h2>

    <p class="text">
      {{ t('home.terms.text') }}
    </p>

    <Button class="action" :aria-label="t('home.terms.action') " @click="see">
      {{ t('home.terms.action') }}
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

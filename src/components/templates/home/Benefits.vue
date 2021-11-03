<script setup lang="ts">
const { t } = useI18n()

const router = useRouter()
</script>

<template>
  <section class="benefits-home">
    <ul class="cards">
      <li class="item">
        <CardTrade
          class="card"
          :label="t('home.benefits.cards.first')"
          @click="router.push({ name: 'BuyMethod' })"
        />
      </li>

      <li class="item">
        <CardTrade class="card" :label="t('home.benefits.cards.second')" />
      </li>

      <li class="item">
        <CardTrade class="card" :label="t('home.benefits.cards.third')" />
      </li>
    </ul>

    <h2 class="title">
      {{ t('home.benefits.title') }}
    </h2>

    <strong class="benefit-item">{{ t('home.benefits.subtitle') }}</strong>
    <strong class="benefit-item">{{ t('home.benefits.subtitle') }}</strong>
    <strong class="benefit-item">{{ t('home.benefits.subtitle') }}</strong>
  </section>
</template>

<style lang="scss">
.benefits-home {
  @apply flex flex-col px-6 pt-8 pb-32;

  background-color: #ececec;

  > .cards {
    @apply grid grid-cols-2
      mb-24;

    row-gap: 24px;
    column-gap: 12px;
    margin-top: -100px;
  }

  > .cards > .item:last-of-type {
    @apply col-span-2;

    > .card {
      @apply w-full;
    }
  }

  > .title {
    @apply font-bold text-2xl mr-15 mb-6;
  }

  > .benefit-item {
    @apply flex justify-center items-center
      mb-6
      font-normal text-sm;

    &::before {
      content: '';
      border-radius: 50%;

      @apply inline-block h-8 w-8 bg-gray-400 mr-12;
    }
  }
}
</style>

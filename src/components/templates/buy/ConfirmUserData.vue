<script setup lang="ts">

const props = defineProps<{
  payment: any // ConfirmProps & { method: string }
  isShow: boolean
}>()

const sanitizePayments = computed(() =>
  Object.entries(props.payment).filter(([key, value]) =>
    !(['terms'].includes(key) || ['', undefined].includes(value as any)),
  ),
)
</script>

<template>
  <section v-show="isShow" class="confirm-data">
    <h1 class="title">
      Confira seus dados
    </h1>

    <ul class="confirm-list">
      <li v-for="([_, value], index) in sanitizePayments" :key="index" class="list-item">
        <!-- <span class="font-bold">{{ t(`buy.confirm.${key}`) }}:</span>
        <span class>{{ value }}</span>-->
        <Textfield :value="value" disabled />
      </li>
    </ul>

    <slot></slot>
  </section>
</template>

<style lang="scss">
.confirm-data {
  @apply flex flex-col items-center
    px-6 w-full;

  > .title {
    @apply text-center font-display font-bold text-2xl mb-2;
  }

  > .confirm-list {
    @apply max-w-66 w-full px-2 py-4;
  }

  > .confirm-list > .list-item {
    @apply flex flex-col px-2  mb-6 text-left;
  }
}
</style>

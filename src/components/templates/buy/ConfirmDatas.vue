<script setup lang="ts">
import { StableCoin } from '@/@types/payments'

type ConfirmProps = Partial<StableCoin>

const props = defineProps<{
  payment: ConfirmProps & { method: string }
  isShow: boolean
}>()

const { t } = useI18n()

const sanitizePayments = computed(() =>
  Object.entries(props.payment).filter(([key, value]) =>
    !(['terms'].includes(key) || [''].includes(value)),
  ),
)
</script>

<template>
  <section v-show="isShow" class="purchase-summary">
    <section class="flex justify-between items-center mb-6">
      <span class>Confira seus dados</span>

      <span class="text-xs underline-dark-100 underline">Ver termos</span>
    </section>

    <ul class="summary-list">
      <li v-for="([key, value], index) in sanitizePayments" :key="index" class="list-item">
        <span class="font-bold">{{ t(`buy.confirm.${key}`) }}:</span>
        <span class>{{ value }}</span>
      </li>
    </ul>

    <slot></slot>
  </section>
</template>

<style lang="scss">
.purchase-summary {
  @apply max-w-80 w-10/12;

  > .summary-list {
    @apply flex flex-col
      px-2 py-4
    bg-dark-200 text-white;
  }

  > .summary-list > .list-item {
    @apply flex flex-col px-2  mb-2 text-left;
  }
}
</style>

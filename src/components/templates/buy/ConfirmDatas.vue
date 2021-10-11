<script setup lang="ts">
import { StableCoin } from '@/@types/payments'

type ConfirmProps = Partial<StableCoin>

defineProps<{
  payment: ConfirmProps & { method: string }
  isShow: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <section v-show="isShow" class=" max-w-80 w-10/12">
    <section class="flex justify-between items-center mb-6">
      <span class="">Confira seus dados</span>

      <span class="text-xs underline-dark-100 underline">Ver termos</span>
    </section>

    <ul class="bg-dark-200 text-white px-2 py-4">
      <li
        v-for="(value, key, index) in payment"
        :key="index"
        class="flex flex-wrap mb-2"
      >
        <span class="keyd ml-2 font-bold">{{ t(`buy.confirm.${key}`) }}:</span>
        <span class="valued ml-4 text-right">{{ value }} </span>
      </li>
    </ul>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { InputEvent } from '@/@types/globals'

import { shouldRequired } from '@/composables/useFormValidation'

const props = defineProps<{
  placeholder?: string
  requiredMessage?: string
}>()

function validate(event: unknown) {
  const { target } = event as InputEvent
  shouldRequired(target, props.requiredMessage ?? 'É necessário escolher uma das opções')
}

function checking(event: unknown) {
  const { target } = event as InputEvent

  target.checkValidity() && target.reportValidity()
}
</script>

<template>
  <select class="select-core" @invalid="validate" @change="checking">
    <option selected disabled value="" class="text-gray-500! text-xs!">
      {{ placeholder }}
    </option>
    <slot></slot>
  </select>
</template>

<style lang="scss">
.select-core {
  @apply h-11 px-4
    rounded-md bg-transparent;
  cursor: pointer;
  border: 2px solid #212121;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-repeat: no-repeat;
    background-image: url('/arrow_dropdown.svg');   /* Add custom arrow */
    background-position-x: 96%;
    background-position-y: 10px;
}
</style>

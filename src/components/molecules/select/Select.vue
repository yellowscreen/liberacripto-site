<script setup lang="ts">
import { InputEvent } from '@/@types/globals'

import { shouldRequired } from '@/composables/useFormValidation'

const props = defineProps<{
  placeholder: string
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
    <option selected disabled value="">
      {{ placeholder }}
    </option>
    <slot></slot>
  </select>
</template>

<style lang="scss">
.select-core {
  @apply h-11 px-4
    rounded-md bg-transparent;

  border: 1px solid #212121;

}
</style>

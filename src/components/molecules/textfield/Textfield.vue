<script setup lang="ts">
import type { InputEvent } from '@/@types/globals'
import { shouldPattern, shouldRequired } from '@/composables/useFormValidation'

type InputProps = {
  requiredMessage?: string
  patternMessage?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  patternMessage: 'Valor inválido',
  requiredMessage: 'Campo obrigátorio',
})

function validate(event: unknown) {
  const { target } = event as InputEvent
  shouldRequired(target, props?.requiredMessage)
  shouldPattern(target, props?.patternMessage)
}

function checking(event: unknown) {
  const { target } = event as InputEvent

  target.checkValidity() && target.reportValidity()
}
</script>

<template>
  <input class="input-core" @invalid="validate" @change="checking" />
</template>

<style lang="scss">
.input-core {
  @apply h-11 px-4
    rounded-md bg-transparent
    text-sm;

  border: 2px solid #212121;

  &::placeholder {
    @apply text-gray-500 text-xs;
  }

  &:disabled {
    background-color: #d4d4d4;
    border: none;
  }

}
</style>

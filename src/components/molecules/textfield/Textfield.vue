<script setup lang="ts">
import type { InputEvent } from '@/@types/globals'
import { shouldPattern, shouldRequired } from '@/composables/useFormValidation'

interface Props {
  requiredMessage?: string
  patternMessage?: string
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
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
  <input
    v-bind="$attrs"
    class="input-core"
    :data-hint="hint"
    @invalid="validate"
    @change="checking"
  />
</template>

<style lang="scss">
.input-core {
  @apply relative h-11 px-4
    rounded-md bg-transparent
    text-sm;

  overflow: initial;
  border: 2px solid #212121;

  &::placeholder {
    @apply text-gray-500 text-xs;
  }

  &:disabled {
    background-color: #d4d4d4;
    border: none;
  }

  &::after {
    content: attr(data-hint);

    @apply inline-block absolute
  top-11 left-0
  text-2xs text-fonts-primary-dark;
  }

}
</style>

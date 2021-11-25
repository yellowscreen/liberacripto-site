<script lang="ts" setup>
import { Order } from '@/@types/admin'

defineProps<{
  label: string
  method: Order['payment_method']
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:method', v: Order['payment_method']): void
}>()
</script>

<template>
  <button
    type="button"
    :class="{ '-active': active }"
    class="button-tab-method"
    @click="emit('update:method', method)"
  >
    {{ label }}
  </button>
</template>

<style lang="scss">
.button-tab-method {
  @apply min-w-80px w-min h-36px px-4
    bg-transparent text-white;

  border: 1px solid white;
  border-radius: 40px;

  &.-active {
    @apply bg-cta text-transparent border-cta text-primary-light;
  }
}
</style>

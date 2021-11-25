<script lang="ts" setup>
import { Order } from '@/@types/admin'

defineProps<{
  label: string
  type: Order['type']
  active?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:type', v: Order['type']): void
}>()
</script>

<template>
  <button
    type="button"
    :class="{ '-active': active }"
    class="button-tab-type"
    @click="emit('update:type', type)"
  >
    {{ label }}
  </button>
</template>

<style lang="scss">
.button-tab-type {
  @apply min-w-80px h-36px
    bg-transparent text-white;

  width: fit-content;

  &.-active {
    border-bottom: 3px solid;

    @apply border-cta;
  }
}
</style>

<script setup lang="ts">
import type { InputEvent } from '@/@types/globals'

type SearchProps = {
  open: boolean
}

withDefaults(defineProps<SearchProps>(), {
  open: false,
})

const emit = defineEmits<{
  (e: 'search', value: any): void
  (e: 'update:open', isOpen: boolean): void
}>()
</script>

<template>
  <div class="searchbar-core">
    <input
      class="input-search"
      :class="!open && '!w-0  opacity-0 pointer-events-none'"
      placeholder="Consultar transação"
      @keyup.enter="({ target }: InputEvent) => emit('search', target.value)"
    />
    <button
      class="button-search"
      :class="open && 'bg-white'"
      @click="emit('update:open', !open)"
    >
      <carbon:search class="text-gray-300" :class="open && 'text-gray-700'" />
    </button>
  </div>
</template>

<style lang="scss">
.searchbar-core {
  @apply flex justify-end;

  > .button-search {
    @apply flex justify-center items-center
      w-8 h-8 rounded-r-xl flex-shrink-0;
  }

  > .input-search {
    @apply w-full
      pl-2 rounded-l-xl
      transform-gpu transition-all origin-right;
  }
}
</style>

<script setup lang="ts">
import type { InputEvent } from '@/@types/globals'

type SearchProps = {
  open: boolean
}

const props = withDefaults(defineProps<SearchProps>(), {
  open: false,
})

const emit = defineEmits<{
  (e: 'search', value: any): void
  (e: 'update:open', isOpen: boolean): void
}>()

function clearAndFocus() {
  const inputSearch = document.querySelector(
    '.searchbar-core > .input-search',
  ) as HTMLInputElement

  inputSearch.value = ''
  inputSearch.focus()
}

watchEffect(() => props.open && clearAndFocus())
</script>

<template>
  <div class="searchbar-core">
    <input
      class="input-search"
      :tabindex="open ? 0 : -1"
      placeholder="Consultar transação"
      :class="!open && '!w-0  opacity-0 pointer-events-none'"
      @keyup.enter="({ target }: InputEvent) => emit('search', target.value)"
    />
    <button
      class="button-search"
      :class="open && 'bg-white'"
      :aria-label="open ? 'close searchbar' : 'open searchbar'"
      @click="emit('update:open', !open)"
    >
      <carbon:search class="" />
    </button>
  </div>
</template>

<style lang="scss">
.searchbar-core {
  @apply flex justify-end;

  > .button-search {
    @apply flex justify-center items-center
      w-8 h-8 rounded-r-md flex-shrink-0;
  }

  > .input-search {
    @apply w-full
      pl-2 rounded-l-md
      transform-gpu transition-all origin-right;
  }
}
</style>

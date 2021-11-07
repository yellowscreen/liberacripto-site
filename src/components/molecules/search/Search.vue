<script setup lang="ts">
interface Props {
  open: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
})

const emit = defineEmits<{
  (e: 'search', value: any): void
  (e: 'update:open', isOpen: boolean): void
}>()
const inputEl = ref<HTMLInputElement>()

function clearAndFocus() {
  const inputSearch = document.querySelector(
    '.searchbar-core > .input-search',
  ) as HTMLInputElement

  inputSearch.value = ''
  inputSearch.focus()
}

function searchClose() {
  const code = inputEl?.value?.value
  if (code) {
    emit('search', code)
    clearAndFocus()
  }

  emit('update:open', !props.open)
}

watchEffect(() => props.open && clearAndFocus())
</script>

<template>
  <div class="searchbar-core">
    <input
      ref="inputEl"
      class="input-search"
      :tabindex="open ? 0 : -1"
      placeholder="Consultar transação"
      :class="!open && '!w-0  opacity-0 pointer-events-none'"
      @keyup.enter="searchClose"
    />
    <button
      class="button-search"
      :class="open && 'bg-white text-fonts-primary-dark'"
      :aria-label="open ? 'close searchbar' : 'open searchbar'"
      @click="searchClose"
    >
      <carbon:search class="" />
    </button>
  </div>
</template>

<style lang="scss">
.searchbar-core {
  @apply flex justify-end h-12;

  > .button-search {
    @apply flex justify-center items-center
      w-12 h-12 rounded-r-md flex-shrink-0;
  }

  > .input-search {
    @apply w-full
      pl-2 rounded-l-md text-fonts-primary-dark
      transform-gpu transition-all origin-right;
  }
}
</style>

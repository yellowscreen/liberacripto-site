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

function search() {
  const code = inputEl?.value?.value
  code && emit('search', code)
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
    <button class="button-desktop" aria-label="buscar transação" @click="search">
      <carbon:search class="text-stroke-fonts-primary-light" />
    </button>

    <input
      ref="inputEl"
      class="input-search -text-search"
      :tabindex="open ? 0 : -1"
      placeholder="Consultar transação"
      :class="!open && 'close-search'"
      @keyup.enter="search"
    />
    <button
      class="button-search"
      :class="open && 'close-button'"
      :aria-label="open ? 'close searchbar' : 'open searchbar'"
      @click="searchClose"
    >
      <carbon:search class />
    </button>
  </div>
</template>

<style lang="scss">
.searchbar-core {
  @apply flex justify-end h-12;

  @screen md {
    @apply rounded-md border-fonts-primary-light;
    border: 1px solid;
  }

  > .button-search {
    @apply flex justify-center items-center
      w-12 h-12 rounded-r-md flex-shrink-0;

    @screen md {
      @apply hidden;
    }
  }

  > .button-desktop {
    @apply hidden;

    @screen md {
      @apply flex justify-center items-center
        w-12 h-12 rounded-l-md flex-shrink-0;
    }
  }

  > .close-search {
    @apply w-0  opacity-0 pointer-events-none;
  }

  > .close-button {
    @apply bg-white text-fonts-primary-dark;
  }

  > .input-search {
    @apply w-full
      pl-2 rounded-l-md text-fonts-primary-dark
      transform-gpu transition-all origin-right;

    @screen md {
      @apply w-full opacity-100 pointer-events-auto
        rounded-l-none rounded-r-md;
      background: transparent !important;
    }
  }
}
</style>

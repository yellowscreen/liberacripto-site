<script setup lang="ts">

const emit = defineEmits<{
  (e: 'search', value: any): void

}>()
const inputEl = ref<HTMLInputElement>()

function search() {
  const code = inputEl?.value?.value
  emit('search', code)
}

</script>

<template>
  <div class="searchbar-core-admin">
    <input
      ref="inputEl"
      class="input-search -text-search"
      placeholder="Consultar transação"
      @keyup.enter="search"
    />

    <button class="button-search" aria-label="buscar transação" @click="search">
      <carbon:search class="text-stroke-fonts-primary-light" />
    </button>
  </div>
</template>

<style lang="scss">
.searchbar-core-admin {
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

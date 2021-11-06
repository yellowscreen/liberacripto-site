<script setup lang="ts"></script>

<template>
  <button class="button-core" type="button">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.button-core {
  @apply h-12 px-4 py-3
    rounded-md font-bold text-sm
    hover:brightness-150 hover:filter;

  transition: filter 200ms cubic-bezier(0.86, 0, 0.07, 1);

  &.-link {
    @apply relative bg-transparent font-normal
      hover:bg-indigo-700 hover:text-gray-100 hover:filter-none;

    transition: background 200ms cubic-bezier(0.86, 0, 0.07, 1),
      color 200ms cubic-bezier(0.86, 0, 0.07, 1);

    &::after {
      @apply inline-block absolute
        h-px  bottom-3 left-4
      bg-gray-700
        hover:bg-transparent;

      content: "";
      width: calc(100% - 32px);
    }
  }

  &.-secondary {
    @apply bg-transparent
    rounded-md border-dark-50 border-solid border-2;
  }
}
</style>

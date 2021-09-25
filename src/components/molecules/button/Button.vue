<script setup lang="ts"></script>

<template>
  <button class="button-core">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.button-core {
  @apply h-12 px-4 py-3 rounded-md font-bold text-sm;
}
</style>

<script lang="ts" setup>
const props = defineProps<{
  code: string
  label?: string
}>()

function copyToClipboard() {
  navigator.clipboard.writeText(props.code)
}
</script>

<template>
  <button type="button" class="clipboard-code" @click="copyToClipboard">
    <span class="label">{{ label }}</span>
    <span class="code">{{ code }}</span>
    <mdi:content-copy />
  </button>
</template>

<style lang="scss">
.clipboard-code {
  @apply flex items-center justify-between relative
    w-full px-3 py-3  bg-gray-400;

  max-width: 320px;

  > .label {
    position: absolute;
    bottom: 110%;
    left: 0;

    &:empty {
      display: none;
    }
  }

  > .code {
    @apply pr-4 font-mono;
  }
}
</style>

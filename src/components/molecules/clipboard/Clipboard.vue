<script lang="ts" setup>
interface Props {
  code: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Hash do token',
})

function copyToClipboard() {
  navigator.clipboard.writeText(props.code)
}
</script>

<template>
  <button type="button" class="clipboard-code" @click="copyToClipboard">
    <span class="label">{{ label }}</span>

    <div class="container-code">
      <span class="code">{{ code }}</span>

      <div class="icon-copy">
        <mdi:content-copy class="text-primary-light" />
      </div>
    </div>
  </button>
</template>

<style lang="scss">
.clipboard-code {
  @apply flex flex-col;

  width: clamp(270px, 100%, 90vw);

  > .label {
    @apply text-fonts-secondary-dark mb-1;

    &:empty {
      display: none;
    }
  }

  > .container-code {
    @apply flex justify-between w-full;
  }

  > .container-code {
    > .code {
      @apply inline-block
      h-12 py-4 pl-2 rounded-md
      cursor-pointer text-xs text-fonts-primary-dark;

      width: 70%;

      text-overflow: clip;
      overflow: hidden;
      text-align: start;
      word-break: keep-all;
      white-space: nowrap;

      background-color: #d4d4d4;
    }

    > .icon-copy {
      @apply flex justify-center items-center
        w-11 h-11
      cursor-pointer;

      background-color: #dce2e5;
      border-radius: 50%;
    }
  }
}
</style>

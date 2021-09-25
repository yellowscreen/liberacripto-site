<script setup lang="ts">
type CardProps = {
  label: string
}

withDefaults(defineProps<CardProps>(), {
  label: '',
})
</script>
<template>
  <aside class="card-trade" tabindex="0">
    <div class="icon">
      <slot name="icon"></slot>
    </div>

    <slot name="label">
      <h2 class="label">
        {{ label }}
      </h2>
    </slot>
  </aside>
</template>

<style lang="scss">
.card-trade {
  @apply flex flex-col justify-center items-center
    h-56 w-39 rounded-md bg-gray-400;

  > .icon {
    @apply h-14 w-14 bg-gray-500 mb-10;

    border-radius: 50%;
  }

  > .label {
    @apply font-bold text-2xl;
  }
}
</style>

<script setup lang="ts">
type StepProps = {
  current: number
  total?: number
}

withDefaults(defineProps<StepProps>(), {
  current: 1,
  total: 4,
})
</script>

<template>
  <div class="chip-steps">
    Passo {{ current }} de {{ total }}
  </div>
</template>

<style lang="scss">
.chip-steps {
  @apply flex justify-center items-center
    w-23 h-9
    text-xs;

  color: #707070;
  background-color: #dcdcdc;
  border-radius: 50px;
}
</style>

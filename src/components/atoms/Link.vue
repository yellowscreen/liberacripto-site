<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

type LinkProps = {
  href?: string
  to: RouteLocationRaw
}

defineProps<LinkProps>()
// const props = withDefaults(defineProps<LinkProps>(), {
//   href
// })
</script>

<template>
  <a v-if="href" class="link-core">
    <slot />
  </a>

  <router-link v-else :to="to" class="link-core">
    <slot />
  </router-link>
</template>

<style lang="scss">
.link-core {
  @apply min-w-max
      text-decoration: solid underline 2px;
}
</style>

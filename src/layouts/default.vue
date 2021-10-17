<script setup lang="ts">
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()

watch(
  () => ui.$state.isMenuOpen,
  (isOpen) => {
    isOpen
      ? (document.body.style.overflow = 'hidden hidden')
      : (document.body.style.overflow = 'hidden auto')
  },
)
</script>

<template>
  <Navbar @toggle-menu="ui.toggleMenu()" />
  <Menu :open="ui.$state.isMenuOpen" @toggle-menu="ui.toggleMenu()" />

  <main min-h="[calc(100%-7rem)]" class="text-gray-700 dark:text-gray-200">
    <router-view />
  </main>

  <Footer />
</template>

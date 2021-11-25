<script setup lang="ts">
import { useUIStore } from '@/stores/ui'

const route = useRoute()
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
  <Navbar :class="route.name === 'Home' ? '-dark' : '' " @toggle-menu="ui.toggleMenu()" />
  <Menu :open="ui.$state.isMenuOpen" @toggle-menu="ui.toggleMenu()" />

  <main min-h="[calc(100%-7rem)]" class="text-fonts-primary-dark overflow-x-hidden">
    <router-view />
  </main>

  <Footer :class="route.name === 'Home' ? '-dark' : '' " />
</template>

<style>
main {
  background-color: #ECECEC;
}
</style>

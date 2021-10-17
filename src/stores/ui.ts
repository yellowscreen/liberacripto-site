import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUIStore = defineStore('UI', {
  state: () => ({
    isMenuOpen: false,
  }),

  actions: {
    toggleMenu(shouldOpen?: boolean) {
      const toggle = shouldOpen ?? !this.$state.isMenuOpen

      this.isMenuOpen = toggle
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot))

import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUIStore = defineStore('UI', {
  state: () => ({
    isMenuOpen: false,
    loading: false,
  }),

  actions: {
    toggleMenu(shouldOpen?: boolean) {
      const toggle = shouldOpen ?? !this.isMenuOpen

      this.isMenuOpen = toggle
    },
    toggleLoader(isLoading?: boolean) {
      const toggle = isLoading ?? !this.loading

      this.loading = toggle
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot))

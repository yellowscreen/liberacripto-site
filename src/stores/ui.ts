import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUIStore = defineStore('UI', {
  state: () => ({
    isMenuOpen: false,
    loading: false,
    openModals: [] as string[],

  }),

  actions: {
    toggleMenu(shouldOpen?: boolean) {
      const toggle = shouldOpen ?? !this.isMenuOpen

      this.isMenuOpen = toggle
    },
    toggleLoader(loading?: boolean) {
      const toggle = loading ?? !this.loading
      if (!toggle) {
        return setTimeout(() => {
          this.loading = toggle
        }, 600)
      }

      this.loading = toggle
    },

    

    toggleModal(modal: string) {
      if (this.openModals.includes(modal)) {
        this.openModals = this.openModals.filter(el => el !== modal)
        return
      }

      this.openModals = [...this.openModals, modal]
    },
  },
  getters: {
    isModalOpen: state => (modal: string) => state.openModals.includes(modal),
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot))

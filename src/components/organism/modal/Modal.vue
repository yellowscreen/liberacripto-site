<script lang="ts" setup>
import { useUIStore } from '@/stores/ui'
interface Props {
  modalName: string
  alt: string
  class?: string
}
const props = withDefaults(defineProps<Props>(), {
  modalName: 'modal',
  alt: 'Modal generico',
})
const ui = useUIStore()

const isOpen = computed(() => ui.isModalOpen(props.modalName))

watch(isOpen, (open) => {
  open
    ? document.body.style.overflow = 'hidden hidden'
    : document.body.style.overflow = 'hidden auto'
}, { immediate: true })
function closeModal() {
  ui.toggleModal(props.modalName)
}

const isReady = ref(false)
onMounted(() => isReady.value = true)
</script>

<template>
  <!-- @ to resolve a bug in SSG/SSR -->
  <div v-if="isReady">
    <teleport to="#modals">
      <article
        v-if="isOpen"
        :id="`modal-${modalName}`"
        class="modal-core"
        :class="`${$props.class ?? ''}`"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`modal-header-${modalName}`"
        tabindex="0"
        @keyup.esc="closeModal"
      >
        <header class="header">
          <h1 :id="`modal-header-${modalName}`" class="sr-only">
            {{ alt }}
          </h1>
          <slot name="header" :close-modal="closeModal">
            de
          </slot>
        </header>
        <main class="body" :class="!$slots.footer && '-without-footer'">
          <slot></slot>
        </main>
        <footer class="footer">
          <slot name="footer"></slot>
        </footer>
      </article>
    </teleport>
  </div>
</template>

<style lang="scss">
.modal-core {
  --modal-header-height: 64px;
  --modal-footer-height: 64px;
  @apply fixed top-0 left-0 h-screen w-screen bg-light-400;

  > .header {
    @apply flex justify-start items-center px-6 sticky
      top-0 bg-gray-300;
    height: var(--modal-header-height, 64px);
  }

  > .body {
    @apply overflow-auto;
    min-height: calc(
      100vh - var(--modal-header-height) - var(--modal-footer-height)
    );
    max-height: calc(
      100vh - var(--modal-header-height) - var(--modal-footer-height)
    );
    &.-without-footer {
      min-height: calc(100vh - var(--modal-header-height));
      max-height: calc(100vh - var(--modal-header-height));
    }
  }
  > .footer {
    @apply flex justify-end items-center
      px-6 bg-neutrals-lightgrey-lightest;
    height: var(--modal-footer-height, 64px);
    &:empty {
      display: none;
    }
  }
}
</style>

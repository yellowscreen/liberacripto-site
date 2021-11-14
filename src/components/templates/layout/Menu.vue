<script setup lang="ts">

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-menu'): void
}>()

const links = [
  {
    text: 'Compre cripto',
    name: 'BuyMethod',
  },
  {
    text: 'Venda cripto',
    name: 'SellMethod',
  },
  {
    text: 'Pague uma conta',
    name: 'Home',
  },
  {
    text: 'Comparativos',
    name: 'Home',
  },
]
const el = ref()
onClickOutside(el, () => {
  emit('toggle-menu')
})
</script>

<template>
  <transition name="slide-up" mode="out-in">
    <nav v-if="open" ref="el" class="navbar-menu">
      <ul class="list">
        <li v-for="({ text, name }, index) in links" :key="index" class="item">
          <Link :to="{ name }" class="link" @click="emit('toggle-menu')">
            <span>{{ text }}</span>
            <mdi:chevron-right class="text-fonts-secondary-light" />
          </Link>
        </li>
      </ul>

      <button
        class="text-fonts-secondary-light underline"
        aria-label="close menu"
        @click="emit('toggle-menu')"
      >
        Fechar menu
      </button>
    </nav>
  </transition>
</template>

<style lang="scss">
.navbar-menu {
  @apply flex flex-col justify-center items-center
    fixed bottom-0 w-full
    bg-secondary-darkest;

  height: clamp(30rem, 60vh, 600px);

  z-index: 10;
  transform-origin: bottom;
  transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &::before {
    content: "";
    pointer-events: none;
    height: calc(100vh - 72px);
    bottom: 100%;
    z-index: -1;
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.4);

    transform: scale(1);
    @apply inline-block absolute w-full;
  }

  > .list {
    @apply pb-12 z-1;

    width: clamp(230px, 50vw, 400px);
  }

  > .list > .item {
    @apply mb-12;

    > .link {
      @apply flex justify-between items-center
        text-xl text-left text-secondary-light no-underline;
    }
  }

  > .list > .close {
    @apply absolute right-10 top-10;
  }
}

.slide-up-leave-from,
.slide-up-enter-to {
  transform: scaleY(1);
}
.slide-up-leave-to,
.slide-up-enter-from {
  transform: scaleY(0);
}
</style>

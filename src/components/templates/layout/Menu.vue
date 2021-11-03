<script setup lang="ts">
const { t } = useI18n()

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-menu'): void
}>()

const links = [
  {
    text: 'layout.navbar.buy',
    name: 'BuyMethod',
  },
  {
    text: 'layout.navbar.sell',
    name: 'Home',
  },
  {
    text: 'layout.menu.pay',
    name: 'Home',
  },
  {
    text: 'layout.menu.compare',
    name: 'Home',
  },
]
</script>

<template>
  <transition name="slide-up" mode="out-in">
    <nav v-if="open" class="navbar-menu">
      <ul class="list">
        <li class="close">
          <button aria-label="close menu" @click="emit('toggle-menu')">
            <mdi:close class="text-indigo-400 text-4xl" />
          </button>
        </li>

        <li v-for="({ text, name }, index) in links" :key="index" class="item">
          <Link :to="{ name }" class="link">
            {{ t(text) }}
          </Link>
        </li>
      </ul>
    </nav>
  </transition>
</template>

<style lang="scss">
.navbar-menu {
  @apply flex justify-center items-center
    fixed bottom-0 w-full h-full
    bg-dark-100;

  z-index: 10;
  transform-origin: bottom;
  transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  // &::before {
  //   --tw-bg-opacity: 0.8 !important;

  //   content: '';
  //   height: calc(100vh - 100% - 72px);
  //   bottom: 100%;
  //   z-index: -1;

  //   @apply inline-block absolute bg-indigo-300 w-full;
  // }

  > .list {
    @apply pt-20 pb-12 z-1;
  }

  > .list > .item {
    @apply mb-12;

    > .link {
      @apply text-2xl text-left no-underline text-indigo-300;
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

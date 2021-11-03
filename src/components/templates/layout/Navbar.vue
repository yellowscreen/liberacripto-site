<script setup lang="ts">
const { t } = useI18n()

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
]

const open = ref(false)
</script>
<template>
  <nav class="navbar-core">
    <ul class="list">
      <li class="item">
        <Link :to="{ name: 'Home' }" class="pr-4" aria-label="home">
          <cryptocurrency:btc class="text-xl" />
        </Link>
      </li>

      <li
        v-for="({ text, name }, index) in links"
        :key="index"
        class="item only-desktop"
        :class="open && '!hidden'"
      >
        <Link :to="{ name }">
          {{ t(text) }}
        </Link>
      </li>

      <div class="flex items-center">
        <li>
          <Search v-model:open="open" />
        </li>

        <li>
          <button class="w-14" aria-label="toggle menu" @click="emit('toggle-menu')">
            <radix-icons:hamburger-menu class="h-6 w-full" />
          </button>
        </li>
      </div>
    </ul>
  </nav>
</template>

<style lang="scss">
.navbar-core {
  @apply h-72px w-full
    sticky top-0 px-4;

  background-color: #ECECEC;

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    bottom: 0;

    width: 90%;
    height: 1px;

    background-color: #909090;
  }

  > .list {
    @apply flex justify-between items-center
      h-full;
  }

  > .list {
    > .item {
      @apply flex justify-center  px-2;
    }

    > .only-desktop {
      @apply hidden md:flex;
    }
  }
}
</style>

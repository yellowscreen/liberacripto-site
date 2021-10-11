<script setup lang="ts">
const { t } = useI18n()

const links = [
  {
    text: 'layout.navbar.buy',
    name: 'Buy',
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
          <cryptocurrency:btc
            class="text-purple-400 text-xl dark:text-yellow-400"
          />
        </Link>
      </li>

      <li
        v-for="({ text, name }, index) in links"
        :key="index"
        class="item"
        :class="open && '!hidden'"
      >
        <Link :to="{ name }">
          {{ t(text) }}
        </Link>
      </li>

      <li class>
        <Search v-model:open="open" />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.navbar-core {
  @apply h-72px w-full
    sticky top-0 px-4
    bg-indigo-800 dark:bg-indigo-500;

  > .list {
    @apply flex justify-between items-center
      h-full;
  }

  > .list {
    > .item {
      @apply flex justify-center  px-2 text-purple-200;
    }
  }
}
</style>

<script setup lang="ts">

const { t } = useI18n()

const links = [
  {
    text: 'layout.navbar.buy',
    link: '#',
  },
  {
    text: 'layout.navbar.sell',
    link: '#',
  },
]

const open = ref(false)
</script>
<template>
  <nav class="navbar-core">
    <ul class="list">
      <li class="item">
        <a href="#" class="link pr-4">
          <cryptocurrency:btc class="text-purple-400 text-xl dark:text-yellow-400" />
        </a>
      </li>

      <li
        v-for="({ text, link }, index) in links"
        :key="index"
        class="item"
        :class="open && '!hidden'"
      >
        <a :href="link" class="link">{{ t(text) }}</a>
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

    > .item > .link {
      @apply min-w-max
      text-decoration: solid underline 2px;
    }
  }
}
</style>

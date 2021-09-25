<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <footer class="footer-core">
    <router-link class="icon-btn" to="/" :title="t('button.home')">
      <carbon-campsite />
    </router-link>

    <button
      class="icon-btn mx-2 !outline-none"
      :title="t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
    </a>

    <a class="icon-btn" rel="noreferrer" href="#">{{ t('layout.footer.brand') }}</a>
  </footer>
</template>

<style lang="scss">
.footer-core {
  @apply flex justify-center items-center h-56px w-full
    bg-indigo-800 text-purple-100 dark:bg-indigo-500;

  > .icon-btn {
    @apply mx-5;
  }
}
</style>

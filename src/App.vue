<script setup lang="ts">

useHead({
  title: 'Libera Cripto',
  meta: [
    { name: 'description', content: 'Libera crypto' },
  ],
})
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@font-face {
  font-family: "Altone Trial";
  src: url("/fonts/altone-trial.regular.ttf");
  font-style: normal;
}
@font-face {
  font-family: "Altone Trial";
  src: url("/fonts/altone-trial.bold.ttf");
  font-weight: bold;
}
</style>

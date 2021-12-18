<script setup lang="ts">
// import { useAdminStore } from '@/stores/admin'

const router = useRouter()

// const admin = useAdminStore()


</script>

<template>
  <main class>
    <router-view></router-view>
  </main>

  <footer class="footer-admin">
    <div class="container-buttons">
      <button class="button" @click="router.push({ path: '/admin'})">
        <ic:round-list class="text-2xl" />
        <span>Lista de transações</span>
      </button>

      <button class="button" @click="router.push({ path: '/admin/config/'})">
        <ic:round-settings class="text-2xl" />
        <span>Configurações</span>
      </button>
    </div>
  </footer>
</template>

<style lang="scss">
body {
  @apply bg-fonts-primary-light;
  overflow-x: hidden;
}

.footer-admin {
  @apply flex justify-center sticky bottom-0
    h-24 w-full bg-white;

> .container-buttons {
    @apply flex h-full w-full w-max-600px justify-around items-center;
  }

  > .container-buttons > .button {
    @apply flex flex-col items-center;
  }
}
</style>

<route lang="yaml">
name: AdminConfig

meta:
  layout: admin
  requiresAuth: true
</route>

<script lang="ts" setup>
import { useAdminStore } from '@/stores/admin'

const router = useRouter()
const admin = useAdminStore()

function signout() {
  localStorage.clear()
  admin.storeToken('')
  router.push('/admin/signin')
}

</script>

<template>
  <section class="admin-config-page">
    <header class="header">
      <h1 class="flex text-white font-display font-bold">
        <ic:round-settings class="text-white mr-4" />Configurações
      </h1>
    </header>

    <section class="card">
      <div class="middle">
        <!-- <Button class="button" @click="router.push('/admin/config/taxas')">
          <ic:round-edit />Gerenciar taxas
        </Button>-->

        <Button class="button" @click="router.push('/admin/config/cryptos')">
          <cryptocurrency:btc />Gerenciar criptos
        </Button>

        <Button class="button" @click="router.push('/admin/config/redes')">
          <cryptocurrency:usdt />Gerenciar Stablecoins
        </Button>
      </div>

      <Button class="-secondary mt-28 justify-self-end" @click="signout">
        Deslogar
      </Button>
    </section>
  </section>
</template>

<style lang="scss">
.admin-config-page {
  @apply min-h-screen;

  > .header {
    @apply flex items-center
      px-10 h-100px bg-primary-light;
    box-shadow: 1px 80px 0px 20px #004b74;
  }

  > .card {
    @apply flex flex-col justify-center
      h-full w-8/10 mx-auto px-10 bg-white;
    min-height: 70vh;
    max-width: 500px;

    > .middle {
      @apply flex flex-col justify-self-center;

      > .button {
        @apply flex justify-start items-center
          mb-4
          bg-primary-light text-white font-normal;
      }

      > .button > svg {
        @apply mr-5 mb-1;
      }
    }
  }
}
</style>

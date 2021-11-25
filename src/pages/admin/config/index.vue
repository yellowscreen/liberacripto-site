<route lang="yaml">
name: AdminConfig

meta:
  layout: admin
  requiresAuth: true
</route>

<script lang="ts" setup>
const router = useRouter()
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
        <Button class="button">
          <ic:round-edit />Alterar taxas
        </Button>

        <Button class="button" @click="router.push('/admin/config/cryptos')">
          <cryptocurrency:btc />Gerenciar cripto
        </Button>

        <Button class="button" @click="router.push('/admin/config/cryptos')">
          <cryptocurrency:usdt />Gerenciar stable-coins
        </Button>
      </div>

      <Button class="-secondary mt-28 justify-self-end">
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

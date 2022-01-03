<script lang="ts" setup>

defineProps<{
  name: string
  id: string
  crypto: string
  wallet: string
  image?: string
}>()

const emit = defineEmits<{
  (e: 'update-taxes', v: { name: string; id: string }): void
  (e: 'delete', v: { id: string }): void
}>()
</script>

<template>
  <article class="card-core-crypto">
    <header class="header">
      <!-- <cryptocurrency:btc v-if="crypto === 'btc'" class="icon text-cta" />
      <cryptocurrency:eth v-else-if="RegExp(crypto, 'gi').test('eth')" class="icon text-cta" />
      <cryptocurrency:bnb v-else-if="RegExp(crypto, 'gi').test('bnb')" class="icon text-cta" />
      <cryptocurrency:usdt v-else-if="RegExp(crypto, 'gi').test('usdt')" class="icon text-cta" />
      <cryptocurrency:ada v-else-if="RegExp(crypto, 'gi').test('ada')" class="icon text-cta" />
      <cryptocurrency:xrp v-else-if="RegExp(crypto, 'gi').test('xrp')" class="icon text-cta" />
      <cryptocurrency:dai v-else-if="RegExp(crypto, 'gi').test('dai')" class="icon text-cta" />
      <cryptocurrency:usd v-else class="icon text-cta" /> -->

      <img class="icon" :src="image" alt="" width="32" height="32">

      <div class="container-status">
        <p class="text-left mb-2">
          <strong class="capitalize">{{ name }}</strong>
        </p>

        <p class="text-left">
          <span class="mr-2">ID</span>
          <strong>{{ id }}</strong>
        </p>
      </div>

      <MenuButton :id="`crypto-${id}`" :menu-position="'left'">
        <template #items>
          <li class>
            <Button class="w-full" type="button" @click="emit('update-taxes', { name, id })">
              Editar Taxas
            </Button>
          </li>

          <li class>
            <Button class="bg-red-500 text-white w-full !rounded-none" type="button" @click="emit('delete', { id })">
              Deletar coin
            </Button>
          </li>
        </template>
      </MenuButton>
    </header>

    <hr class="w-full my-2" />

    <footer class="footer">
      <p class="flex flex-col text-left mb-6">
        <span>Wallet</span>
        <strong class="break-all">{{ wallet ?? '0x852d6544eD95D71a0Baaf8B4dDC1A765300e25BE' }}</strong>
      </p>

      <Button class="bg-primary-light text-white !h-42px w-full mb-4" @click="emit('update-taxes', { name, id })">
        Editar taxas
      </Button>

      <Button class="bg-red-500 text-white !h-42px w-full" @click="emit('delete', { id })">
        Deletar coin
      </Button>
    </footer>
  </article>
</template>

<style lang="scss">
.card-core-crypto {
  @apply flex flex-col justify-around items-center
    w-full px-4 py-4 max-w-300px
    bg-white rounded-md font-display;

  height: clamp(320px, 100%, 360px);
  border: 1px solid gray;

  > .header,
  > .footer {
    @apply flex w-full justify-between items-center;
  }

  > .header {
    @apply justify-start;

    > .icon {
      @apply h-12 w-12 mb-4 mr-8 flex-shrink-0;
    }
  }

  > .footer {
    @apply flex flex-col justify-around;
  }

  > .header > .container-status {
    @apply flex flex-col justify-start w-full;
  }
}
</style>

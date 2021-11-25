<script lang="ts" setup>

defineProps<{
  name: string
  id: string
  crypto: string
  wallet: string
}>()
</script>

<template>
  <article class="card-core">
    <header class="header">
      <cryptocurrency:btc v-if="crypto === 'btc'" class="icon text-cta" />
      <cryptocurrency:eth v-else-if="crypto === 'eth'" class="icon text-cta" />
      <cryptocurrency:bnb v-else-if="crypto === 'bnb'" class="icon text-cta" />
      <cryptocurrency:usdt v-else-if="crypto === 'usdt'" class="icon text-cta" />
      <cryptocurrency:ada v-else-if="crypto === 'ada'" class="icon text-cta" />
      <cryptocurrency:xrp v-else-if="crypto === 'xrp'" class="icon text-cta" />
      <cryptocurrency:dai v-else-if="crypto === 'dai'" class="icon text-cta" />
      <cryptocurrency:btc v-else class="icon text-cta" />

      <div class="conntainer-status">
        <p class="text-left mb-2">
          <strong class="capitalize">{{ name }}</strong>
        </p>

        <p class="text-left">
          <span class="mr-2">ID</span>
          <strong>{{ id }}</strong>
        </p>
      </div>
    </header>

    <hr class="w-full" />

    <footer class="footer">
      <p class="flex flex-col text-left">
        <span>Wallet</span>
        <strong class="break-all">{{ wallet ?? '0x852d6544eD95D71a0Baaf8B4dDC1A765300e25BE' }}</strong>
      </p>

      <!-- <p class="flex flex-col text-left">
        <span>Valor</span>
        <strong class="uppercase">{{ currentPrice }}</strong>
      </p> -->
    </footer>
  </article>
</template>

<style lang="scss">
.card-core {
  @apply flex flex-col justify-around items-center
    h-300px w-full px-4 py-4 max-w-300px max-h-180px
    bg-white rounded-md font-display;

  border: 1px solid gray;

  > .header,
  > .footer {
    @apply flex w-full justify-between items-center;
  }

  > .header {
    @apply justify-start;

    > .icon {
      @apply h-12 w-12 mb-4 mr-8;
    }
  }

  > .footer {
    @apply justify-around;
  }

  > .header > .container-status {
    @apply flex flex-col justify-start w-full;
  }
}
</style>

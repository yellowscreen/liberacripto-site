<script lang="ts" setup>
defineProps<{
  status: 'pending' | 'finished' | 'blocked' | 'canceled'
  translateStatus?: string
  orderId: string
  crypto: string
  value: string
}>()
</script>

<template>
  <article class="card-core-order">
    <header class="header">
      <mdi:timer-sand v-if="status === 'pending'" class="icon text-yellow-400" />
      <mdi:block-helper
        v-else-if="status === 'blocked'"
        class="icon text-red-600"
      />
      <ic:round-cancel
        v-else-if="status === 'canceled'"
        class="icon text-red-600"
      />
      <ic:round-check-circle v-else class="icon text-green-600" />

      <div class="conntainer-status">
        <p class="text-left mb-2">
          <span class="mr-2">Status</span>
          <strong class="capitalize">{{ translateStatus ?? status }}</strong>
        </p>

        <p class="text-left">
          <span class="mr-2">ID_Transação</span>
          <strong>{{ orderId }}</strong>
        </p>
      </div>
    </header>

    <hr class="w-full" />

    <footer class="footer">
      <p class="flex flex-col text-left">
        <span>Cripto</span>
        <strong>{{ crypto }}</strong>
      </p>

      <p class="flex flex-col text-left">
        <span>Valor</span>
        <strong>{{ value }}</strong>
      </p>
    </footer>
  </article>
</template>

<style lang="scss">
.card-core-order {
  @apply flex flex-col justify-around items-center
    h-300px w-full px-4 py-4 max-w-500px max-h-180px
    bg-white rounded-md font-display;

  border: 1px solid gray;

  > .header,
  > .footer {
    @apply flex w-full justify-between items-center;
  }

  > .header {
    @apply justify-evenly w-full h-full;

    > .icon {
      @apply h-[48px] w-[48px] min-h-[48px] min-w-[48px] mr-4;
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

<script setup lang="ts">

const props = defineProps<{
  payment: any // ConfirmProps & { method: string }
  isShow: boolean
  networks?: any[]
  cryptos?: any[]
}>()

const sanitizePayments = computed(() =>
  Object.entries(props.payment).filter(([key, value]) =>
    !(['terms'].includes(key) || ['', undefined].includes(value as any)),
  ),
)

function mapText(dict: any[], value: string, key: string) {
  return dict.find(element => RegExp(value).test(element[key]))?.name ?? value
}
</script>

<template>
  <section v-show="isShow" class="confirm-data">
    <h1 class="title">
      Confira seus dados
    </h1>

    <ul class="confirm-list">
      <li v-for="([key, value], index) in sanitizePayments" :key="index" class="list-item">
        <template v-if="key === 'network'">
          <Textfield :value="mapText(networks as any[], value as string, 'id')" disabled />
        </template>

        <template v-else-if="key === 'crypto'">
          <Textfield :value="mapText(cryptos as any[], value as string, 'symbol')" disabled />
        </template>

        <Textfield v-else :value="value" disabled />
      </li>
    </ul>

    <slot></slot>
  </section>
</template>

<style lang="scss">
.confirm-data {
  @apply flex flex-col items-center
    px-6 w-full;

  > .title {
    @apply text-center font-display font-bold text-2xl mb-2;
  }

  > .confirm-list {
    @apply max-w-66 w-full px-2 py-4;
  }

  > .confirm-list > .list-item {
    @apply flex flex-col px-2  mb-6 text-left;
  }
}
</style>

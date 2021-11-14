<script setup lang="ts">

const props = defineProps<{
  payment: any // ConfirmProps & { method: string }
  isShow: boolean
  networks?: any[]
  cryptos?: any[]
}>()

const sanitizePayments = computed(() =>
  Object.entries(props.payment).filter(([key, value]) =>
    !(['terms', 'bank_account'].includes(key) || ['', undefined].includes(value as any)),
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

        <template v-else-if="key === 'payment_method'">
          <Textfield :value="value === 'pix' ? 'pix' : 'Transferência'" disabled />
        </template>

        <Textfield v-else :value="value" disabled />
      </li>

      <li v-for="(value, key) in payment?.bank_account" v-if="payment?.bank_account" :key="key" class="list-item">
        <template v-if="key === 'individual'">
          <Textfield :value="value ? 'individual' : 'Conjuta'" disabled />
        </template>

        <template v-else-if="key === 'type'">
          <Textfield :value="value === 'saving' ? 'Conta Poupança' : 'Conta Corrente'" disabled />
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
    px-6 w-full md:items-start;

  > .title {
    @apply text-center font-display font-bold text-2xl mb-2;
    @screen md {
      max-width: 480px;
      text-align: left;
      margin-left: 16px;
    }

  }

  > .confirm-list {
    @apply max-w-66 w-full px-2 py-4;
    @screen md {
      max-width: 480px;
    }
  }

  > .confirm-list > .list-item {
    @apply flex flex-col px-2  mb-6 text-left;
  }
}
</style>

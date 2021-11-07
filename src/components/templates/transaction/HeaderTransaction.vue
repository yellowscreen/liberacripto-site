<script lang="ts" setup>
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'

import type { Summary } from '@/@types/payments'

type DictionaryStatus = Record<Summary['status'], string>

defineProps<{
  checkPay: Summary
}>()

function formatDate(dateString: string) {
  const date = new Date(dateString)

  if (isValid(date))
    return format(date, 'dd/MM/yy HH:mm')

  return '00/00/00 00:00h'
}

const dicStatus: DictionaryStatus = {
  finished: 'Aguardando compensação',
  pending: 'Pagamento pendente',
  blocked: 'Pagamento pendente',
  canceled: 'Pagamento pendente',
}

const dicTransaction: DictionaryStatus = {
  finished: 'Transação realizada',
  pending: 'Transação pendente',
  blocked: 'Transação pendente',
  canceled: 'Transação pendente',
}
</script>

<template>
  <header class="header-transaction">
    <ic:round-check-circle class="text-green-600 h-8 w-8 mb-4" />

    <h1 class="title">
      {{ dicTransaction[checkPay.status] }}
    </h1>

    <div class="status-card">
      <p>Status da transação:</p>
      <strong class="font-display">{{ dicStatus[checkPay.status] }}</strong>
    </div>

    <section class="infos">
      <p>
        Data da transação:
        <strong class="font-display">{{ formatDate(checkPay?.created_at) }}</strong>
      </p>
      <p>
        Código do pedido:
        <strong class="font-display">{{ checkPay?.shareable_code }}</strong>
      </p>
    </section>
  </header>
</template>

<style lang="scss">
.header-transaction {
  @apply flex flex-col items-center relative
      w-full pb-10 mb-6 mx-8;

  &::before {
    content: "";

    height: 2px;
    background-color: #c8c8c8;

    @apply absolute inline-block bottom-0 w-8/10;
  }

  > .title {
    @apply inline-block w-8/12 font-bold font-display text-2xl mb-6;
  }

  > .status-card {
    @apply px-4 py-4 mb-10 rounded-md;
    background-color: #dcdcdc;
  }

  > .infos {
    @apply flex flex-col items-start;
  }
}
</style>

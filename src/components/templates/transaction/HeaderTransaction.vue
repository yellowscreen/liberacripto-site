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
  blocked: 'Pagamento bloqueado',
  canceled: 'Pagamento cancleado',
}

const dicTransaction: DictionaryStatus = {
  finished: 'Transação realizada',
  pending: 'Transação pendente',
  blocked: 'Transação bloqueada',
  canceled: 'Transação cancelada',
}
</script>

<template>
  <header class="header-transaction">
    <mdi:calendar-clock v-if="checkPay.status === 'pending'" class="text-yellow-400 h-8 w-8 mb-4" />
    <mdi:block-helper v-else-if="checkPay.status === 'blocked'" class="text-red-600 h-8 w-8 mb-4" />
    <ic:round-cancel v-else-if="checkPay.status === 'canceled'" class="text-red-600 h-8 w-8 mb-4" />
    <ic:round-check-circle v-else class="text-green-600 h-8 w-8 mb-4" />

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

  @screen md {
    max-width: 500px;
  }

  &::before {
    content: "";

    height: 2px;
    background-color: #c8c8c8;

    @apply absolute inline-block bottom-0 w-8/10;
  }

  > .title {
    @apply inline-block w-full font-bold font-display text-2xl mb-6 text-center;

    @screen md {
      text-align: center;
    }
  }

  > .status-card {
    @apply px-4 py-4 mb-10 rounded-md;
    background-color: #dcdcdc;
    min-width: 260px;

    @screen md {
      width: 100%;
    }
  }

  > .infos {
    @apply flex flex-col items-start;
  }
}
</style>

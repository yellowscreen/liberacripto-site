<script setup lang="ts">
import { useCryptosStore } from '@stores/cryptos'
import type { Pix } from '@/@types/payments'

const emit = defineEmits<{
  (e: 'user', data: Pix): void
}>()

const crypto = useCryptosStore()

const willPay = ref(0)
const cryptoReceive = ref('')

const willBRLReceive = computed(() => {
  const cryptoBRL = crypto.$state?.cryptos?.[cryptoReceive.value]?.toBRL ?? 1

  return (willPay.value / cryptoBRL) * 0.8
})

function willBeReceive(toPay: string) {
  willPay.value
    = Number(toPay.replace('R$ ', '').replace(/\./g, '').replace(/\,/g, '.')) ?? 0
}

function convertCryptoConvert(value: number) {
  const cryptoSymbol
    = crypto.$state?.cryptos?.[cryptoReceive.value]?.symbol ?? 'R$'

  return Intl.NumberFormat('pt', {
    style: 'currency',
    currency: 'BRL',
    maximumSignificantDigits: 12,
  })
    .format(value)
    .replace('R$', cryptoSymbol)
}

function chooseCyrpto(d: any) {
  const form = new FormData(d.target)
  const data = Object.fromEntries(form as any) as Pix

  emit('user', {
    ...data,
    willReceive: convertCryptoConvert(willBRLReceive.value),
  })
}
</script>

<template>
  <form class="form-buy-with-pix" @submit.prevent="chooseCyrpto">
    <Select
      required
      class="mb-4"
      name="crypto"
      placeholder="Selecione a cripto"
      @change="
        (event: any) => {
          cryptoReceive = event.target.value
        }
      "
    >
      <option
        v-for="{ id, name } in crypto.$state.availables"
        :key="id"
        :value="id"
      >
        {{ name }}
      </option>
    </Select>

    <Textfield
      v-money
      class="textfield"
      name="value"
      placeholder="Insira o valor (R$)"
      required
      @blur="willBeReceive($event.target.value)"
    />

    <strong class="value-to-receive">
      Valor a ser recebido:
      <span class="font-bold">{{ convertCryptoConvert(willBRLReceive) }}</span>
    </strong>

    <Textfield
      class="textfield"
      required
      name="wallet"
      placeholder="Insira o endereço da sua Wallet"
    />
    <!-- pattern="sim|nao|talvez"
      pattern-message="Valores disponiveis (Sim, Não, Talvez)" -->

    <Textfield
      class="textfield"
      type="email"
      name="email"
      placeholder="E-mail para envio do comprovante"
    />

    <Textfield class="textfield" placeholder="Informações adicionais" />

    <label class="mb-8">
      <input type="checkbox" name="terms" />
      Eu li e aceito os termos de uso
    </label>

    <div class="flex justify-between items-center">
      <Link class="goback" :to="{ name: 'Home' }">
        <!-- {{ t('buy.index.back') }} -->
        Cancelar
      </Link>

      <Button class="bg-indigo-500 text-indigo-100">
        Pagar com Pix
      </Button>
    </div>
  </form>
</template>

<style lang="scss">
.form-buy-with-pix {
  @apply flex flex-col w-full mb-8;

  > .value-to-receive {
    @apply mb-6 mt-2
      text-xs font-normal;
  }

  > .textfield {
    @apply w-full mb-4;
  }
}
</style>

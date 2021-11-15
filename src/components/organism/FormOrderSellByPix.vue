<script setup lang="ts">
import { useCryptosStore } from '@stores/cryptos'
import { useOrderStore } from '@stores/order'
import { BuyOrder } from '@/@types/payments'
import { getCurrency } from '@/services/currencies'
import { convertCurrencyToRAWNumber } from '@/composables/useFormat'

type CryptoToSell = {
  cryptoCurrentValue: number
  valueToSell: number
  valueInCrypto: number | string
  cryptoSymbol: string
}

defineProps<{
  title: string | string[]
}>()

const emit = defineEmits<{
  (e: 'next'): void
}>()

const order = useOrderStore()
const crypto = useCryptosStore()

function sellOrderStore(formEvent: any) {
  const form = new FormData(formEvent.target)
  const data = Object.fromEntries(form as any) as BuyOrder & { terms: string }

  const { terms, ...sellOrder } = data

  order.storeSellOrder({ ...sellOrder, payment_method: 'pix' })
  emit('next')
}

const cryptoToSell: CryptoToSell = reactive({
  cryptoSymbol: '',
  cryptoCurrentValue: 0.1,
  valueToSell: 0,
  valueInCrypto: computed(() => Number(cryptoToSell.valueToSell / cryptoToSell.cryptoCurrentValue).toPrecision(18) || 0),
})

async function getCryptoValue(ev: any) {
  const symbol = ev.target.value
  const cryptoId = crypto.available.find(el => el.symbol === symbol)?.id ?? 'bitcoin'
  cryptoToSell.cryptoSymbol = symbol

  const { data } = await getCurrency(cryptoId)

  cryptoToSell.cryptoCurrentValue = data.current_price
}

function setValueToSell(ev: any) {
  const value = ev.target.value
  cryptoToSell.valueToSell = convertCurrencyToRAWNumber(value)
}
</script>

<template>
  <form class="form-sell-order-pix" @submit.prevent="sellOrderStore">
    <h1 class="title">
      Informe seus dados
    </h1>

    <fieldset class="group">
      <legend class="title-group">
        Cripto a ser vendida
      </legend>
      <Select
        required
        class="mb-4 select"
        name="crypto"
        placeholder="Selecione a cripto"
        @change="getCryptoValue"
      >
        <option
          v-for="{ id, name, symbol } in crypto.available"
          :key="id"
          :value="symbol"
        >
          {{ name }}
        </option>
      </Select>

      <Textfield
        v-money
        :disabled="!cryptoToSell.cryptoSymbol"
        required
        name="value"
        class="textfield"
        inputmode="numeric"
        placeholder="Insira o valor (R$)"
        @blur="setValueToSell"
      />
      <!--
      <Textfield
        :disabled="!cryptoToSell.cryptoSymbol"
        class="textfield"
        inputmode="numeric"
        :value="cryptoToSell.valueInCrypto"
        placeholder="Valor em cripto"
      /> -->

      <strong
        v-show="cryptoToSell.cryptoSymbol"
        class="input-core font-display uppercase text-xs flex items-center !bg-gray-300 "
      >{{ cryptoToSell.cryptoSymbol }} {{ cryptoToSell.valueInCrypto }}</strong>
    </fieldset>

    <fieldset class="group">
      <legend class="title-group">
        Dados de recebimento
      </legend>

      <Textfield class="textfield" name="client_pix" placeholder="Chave PIX" />

      <Textfield class="textfield" type="email" name="email" placeholder="E-mail (opcional)" />

      <Textfield class="textfield" name="extras" placeholder="Informações adicionais" />
    </fieldset>
    <label class="terms">
      <input type="checkbox" name="terms" required />
      <span>Eu li e aceito os termos de uso</span>
    </label>

    <div class="flex justify-between items-center">
      <Link class="goback" :to="{ name: 'Home' }">
        Cancelar
      </Link>

      <Button class="bg-primary-dark text-indigo-100 px-6" type="submit">
        Vender cripto
      </Button>
    </div>
  </form>
</template>

<style lang="scss">
.form-sell-order-pix {
  @apply flex flex-col w-full mb-8;

  > .title {
    @apply font-display font-bold text-2xl mb-3;
  }

  > .group {
    @apply w-full mb-6;
  }

  > .group {
    > .title-group {
      @apply font-display font-bold text-xs mb-4;
    }

    > .value-to-receive {
      @apply mb-6 mt-2
      text-xs font-normal;
    }

    > .textfield,
    > .select {
      @apply w-full mb-4;
    }
  }

  > .terms {
    @apply mb-8;

    > input {
      @apply mr-1;
    }

    > span {
      @apply text-base text-gray-500;
      text-decoration: solid 1px #707070 underline;
    }
  }
}
</style>

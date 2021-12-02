<script setup lang="ts">
import { useCryptosStore } from '@stores/cryptos'
import { useOrderStore } from '@stores/order'
import { BuyOrder } from '@/@types/payments'
import { getCurrency } from '@/services/currencies'
import { convertCurrencyToRAWNumber } from '@/composables/useFormat'

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

const desisto = ref('')

const cryptoS = ref({
  name: '',
  value: 213,
})

const cryptoToSell = ref({
  cryptoSymbol: '',
  cryptoTaxed: 0,
})

function setCryptoToSell(ev: any) {
  const code = ev.target.value

  const cryptoId = crypto.available.find(el => el.code === code)?.name ?? 'bitcoin'

  cryptoToSell.value.cryptoSymbol = code
  cryptoS.value.name = cryptoId
}

function setValueToSell(ev: any) {
  const inp = ev.target as HTMLInputElement
  const value = inp.value
  cryptoS.value.value = convertCurrencyToRAWNumber(value)
}

watch(cryptoS, ({ name, value }) => {
  if (name.length && value > 0) {
    getCurrency(name, value).then(({ data }) => {
      cryptoToSell.value.cryptoTaxed = data.totalTaxedCrypto
    })
  }
}, { deep: true })
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
        @change="setCryptoToSell"
      >
        <option v-for="{ id, name, code } in crypto.available" :key="id" :value="code">
          {{ name }}
        </option>
      </Select>

      <TextfieldMoney
        id="crypto-value"
        v-model:value="desisto"

        required
        name="value"
        class="textfield"
        inputmode="numeric"
        placeholder="Insira o valor (R$)"
        @blur.stop="setValueToSell"
      />
      <!--
      <Textfield
        :disabled="!cryptoToSell.cryptoSymbol"
        class="textfield"
        inputmode="numeric"
        :value="cryptoToSell.valueInCrypto"
        placeholder="Valor em cripto"
      />-->

      <strong
        v-show="cryptoToSell.cryptoSymbol"
        class="input-core font-display uppercase text-xs flex items-center !bg-gray-300"
      >{{ cryptoToSell.cryptoSymbol }} {{ cryptoToSell.cryptoTaxed }}</strong>
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

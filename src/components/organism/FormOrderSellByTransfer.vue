
<script setup lang="ts">
import { useCryptosStore } from '@stores/cryptos'
import { useOrderStore } from '@stores/order'
import SelectAutocomplete from '../molecules/select/SelectAutocomplete.vue'
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

const route = useRoute()
const order = useOrderStore()
const crypto = useCryptosStore()

const payment_method = computed(() => route.params.method === 'transferencia' ? 'transfer' : 'pix')

function sellOrderStore(formEvent: any) {
  const form = new FormData(formEvent.target)
  const data = Object.fromEntries(form as any) as any

  const { terms, account, branch, type, individual, owner_name, owner_document, bank, ...sellOrder } = data

  const bank_account = {
    account,
    branch,
    type,
    bank,
    individual,
    owner_name,
    owner_document,
  }

  order.storeSellOrder({ ...sellOrder, payment_method, bank_account })
  emit('next')
}

const cryptoToSell: CryptoToSell = reactive({
  cryptoSymbol: '',
  cryptoCurrentValue: 0.1,
  valueToSell: 0,
  valueInCrypto: computed(() => Number(cryptoToSell.valueToSell / cryptoToSell.cryptoCurrentValue).toPrecision(18) || 0),
})

async function getCryptoValue(ev: any) {
  const code = ev.target.value
  const cryptoId = crypto.available.find(el => el.code === code)?.id ?? 'bitcoin'
  cryptoToSell.cryptoSymbol = code

  const { data } = await getCurrency(cryptoId)

  cryptoToSell.cryptoCurrentValue = data.current_price
}

function setValueToSell(ev: any) {
  const value = ev.target.value
  cryptoToSell.valueToSell = convertCurrencyToRAWNumber(value)
}

onMounted(() => {
  order.storeBanks()
})
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
          v-for="{ id, name, code } in crypto.available"
          :key="id"
          :value="code"
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
      />-->

      <strong
        v-show="cryptoToSell.cryptoSymbol"
        class="input-core font-display uppercase text-xs flex items-center !bg-gray-300"
      >{{ cryptoToSell.cryptoSymbol }} {{ cryptoToSell.valueInCrypto }}</strong>
    </fieldset>

    <fieldset class="group" name="bank_account">
      <legend class="title-group">
        Dados de recebimento
      </legend>

      <SelectAutocomplete
        id="banks"
        required
        class="mb-4 select"
        name="bank"
        placeholder="Selecione o banco"
      >
        <option v-for="{ id, name, code } in order.banks" :key="id" :value="` ${code} - ${name}`"></option>
      </SelectAutocomplete>

      <div class="grid grid-cols-3 gap-4 mb-4">
        <Textfield class="textfield col-span-1" name="branch" placeholder="Agência" />
        <Textfield class="textfield col-span-2" name="account" placeholder="Conta com dígito" />
      </div>

      <Textfield class="textfield" name="owner_name" placeholder="Nome do titular" />
      <Textfield
        v-mask="['###.###.###-##','##.###.###/####-##']"
        class="textfield"
        name="owner_document"
        placeholder="CPF/CNPJ"
      />

      <Select required class="mb-4 select" name="type" placeholder="Tipo de conta">
        <option value="saving">
          Poupança
        </option>

        <option value="checking">
          Corrente
        </option>
      </Select>
    </fieldset>

    <fieldset class="group">
      <Textfield class="textfield" type="email" name="email" placeholder="E-mail (opcional)" />

      <Textfield class="textfield" name="extras" placeholder="Informações adicionais" />

      <div class="textfield flex justify-around">
        <label>
          <input type="radio" name="individual" value="true" />
          <span class="ml-2">Individual</span>
        </label>

        <label>
          <input type="radio" name="individual" value="false" />
          <span class="ml-2">Conjunta</span>
        </label>
      </div>
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

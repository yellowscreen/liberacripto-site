<script setup lang="ts">
import { useCryptosStore } from '@stores/cryptos'
import { useOrderStore } from '@stores/order'
import { PaymentMethod, BuyOrder } from '@/@types/payments'

defineProps<{
  title: string | string[]
}>()

const emit = defineEmits<{
  (e: 'next'): void
}>()

const route = useRoute()
const method = route.params.method as keyof typeof PaymentMethod

const order = useOrderStore()
const crypto = useCryptosStore()

const buttonBuyText = computed(() => {
  const methods = [{ id: 'boleto', text: 'Gerar boleto' }, { id: 'pix', text: 'Pagar com Pix' }]
  return methods.find(({ id }) => id === method) ?? { text: 'Gerar orderm' }
})

function buyOrder(formEvent: any) {
  const form = new FormData(formEvent.target)
  const data = Object.fromEntries(form as any) as BuyOrder & { terms: string }

  const { terms, ...buyOrder } = data

  order.storeOrder({ ...buyOrder, method })
  emit('next')
}
</script>

<template>
  <form class="form-order-buy" @submit.prevent="buyOrder">
    <h1 class="title">
      Comprar com
      <span class="capitalize">{{ title }}</span>
    </h1>

    <Select required class="mb-4" name="crypto" placeholder="Selecione a cripto">
      <option
        v-for="{ id, name, symbol } in crypto.$state.available"
        :key="id"
        :value="symbol"
      >
        {{ name }}
      </option>
    </Select>

    <Textfield
      v-money
      required
      name="value"
      class="textfield"
      inputmode="numeric"
      placeholder="Insira o valor (R$)"
    />

    <Textfield class="textfield" required name="wallet" placeholder="Endereço da sua Wallet" />

    <Textfield class="textfield" type="email" name="email" placeholder="E-mail (opcional)" />

    <Textfield class="textfield" name="extras" placeholder="Informações adicionais" />

    <label class="terms">
      <input type="checkbox" name="terms" required />
      <span>Eu li e aceito os termos de uso</span>
    </label>

    <div class="flex justify-between items-center">
      <Link class="goback" :to="{ name: 'Home' }">
        Cancelar
      </Link>

      <Button class="bg-blue-900 text-indigo-100 px-6" type="submit">
        {{ buttonBuyText.text }}
      </Button>
    </div>
  </form>
</template>

<style lang="scss">
.form-order-buy {
  @apply flex flex-col w-full mb-8;

  > .title {
    @apply font-display font-bold text-2xl mb-3;
  }

  > .value-to-receive {
    @apply mb-6 mt-2
      text-xs font-normal;
  }

  > .textfield {
    @apply w-full mb-4;
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

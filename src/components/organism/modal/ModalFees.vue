<script lang="ts" setup>

import { convertNumberToCurrency } from '@/composables/useFormat'
import { showSnackbar } from '@/composables/useSnackbar'
import {
  getCryptoTaxes,
  updateCryptoTaxes,
  getNetworkTaxes,
  updateNetworkTaxes,
} from '@/services/admin'

import { useUIStore } from '@/stores/ui'

const ui = useUIStore()

const props = defineProps<{
  isStablecoin: boolean
  cryptoName: string
  id: string
}>()

const taxes = ref({
  from: 0,
  to: 2,
  percentage: 1,
  type: '',
})

const hasPreviousTax = ref(false)
const method = computed(() => hasPreviousTax.value ? 'PUT' : 'POST')

function convert(val: string | number) {
  return convertNumberToCurrency(Number(val))
}
const emit = defineEmits<{
  (e: 'update-list'): void
}>()

function sanitizeTaxes() {
  return {
    from: Number(taxes.value.from),
    to: Number(taxes.value.to),
    percentage: Number(taxes.value.percentage),
    type: taxes.value.type,
  }
}

function updateTax() {
  if (props.isStablecoin) {
    updateNetworkTaxes(method.value, props.id, sanitizeTaxes()).then(() => {
      showSnackbar({ type: 'success', title: 'Taxa atualizada com sucesso', description: `${props.cryptoName} ${sanitizeTaxes().percentage}%` })
      emit('update-list')
      ui.toggleModal('taxes')
    })
  }
  else {
    updateCryptoTaxes(method.value, props.id, sanitizeTaxes()).then(() => {
      showSnackbar({ type: 'success', title: 'Taxa atualizada com sucesso', description: `${props.cryptoName} ${sanitizeTaxes().percentage}%` })
      emit('update-list')
      ui.toggleModal('taxes')
    })
  }
}

function validTaxFromAPI(data: any) {
  if (data.length) {
    hasPreviousTax.value = true
    taxes.value = data[0]
  }
  else {
    hasPreviousTax.value = false
    taxes.value = {
      from: 0,
      to: 200,
      percentage: null,
      type: '',
    }
  }
}

onUpdated(async() => {
  if (props.isStablecoin) {
    const { data } = await getNetworkTaxes(props.id)
    validTaxFromAPI(data)
  }
  else {
    const { data } = await getCryptoTaxes(props.id)
    validTaxFromAPI(data)
  }
})
</script>

<template>
  <Modal modal-name="taxes" alt="Adicionar stablecoin" class="modal-taxes">
    <template #header="{ closeModal }">
      <div class="flex w-full h-full items-center justify-between">
        <h1 class="font-bold text-base font-display">
          Alterar taxas
        </h1>

        <button @click="closeModal">
          <mdi:close class="text-2xl" />
        </button>
      </div>
    </template>

    <form name="taxes" class="mx-4 mt-4" @submit.prevent="updateTax">
      <div class="card-taxes">
        <h2 class="mb-10 font-display font-bold text-xl">
          Alterar taxas de {{ cryptoName }}
        </h2>

        <h3 class="font-bold font-display text-sm mb-8">
          Range de valor
        </h3>

        <Select
          required
          class="w-full mb-8"
          placeholder="Tipo de transação"
          @change="taxes.type = $event.target.value"
        >
          <option :selected="taxes.type === 'buy'" value="buy">
            Compra
          </option>
          <option :selected="taxes.type === 'sell'" value="sell">
            Venda
          </option>
        </Select>

        <label class="flex flex-col w-full mb-6">
          <p class="flex justify-between w-full font-display text-sm">
            <span class="inline-block">Valor inicial</span>
            <span class="inline-block">{{ convert(taxes.from) }}</span>
          </p>

          <input
            v-model="taxes.from"
            required
            name="from"
            step="1"
            type="range"
            min="0"
            :max="10000"
          />
        </label>

        <label class="flex flex-col w-full mb-12">
          <p class="flex justify-between w-full font-display text-sm">
            <span class="inline-block">Valor final</span>
            <span class="inline-block">{{ convert(taxes.to) }}</span>
          </p>

          <input
            v-model="taxes.to"
            required
            name="to"
            step="1"
            type="range"
            :min="200"
            :max="20000"
          />
        </label>

        <Textfield
          v-model:value="taxes.percentage"
          required
          hint="Taxas"
          type="number"
          min="0"
          max="30"
          step="0.01"
          class="textfield"
          name="percentage"
          placeholder="Insira a taxa (%)"
        />

        <Button type="submit" class="-primary w-full bg-primary-light text-white">
          Atualizar taxa
        </Button>
      </div>
    </form>
  </Modal>
</template>

<style lang="scss">
.modal-taxes {
  .card-taxes {
    @apply flex flex-col items-start
      mx-auto px-10 py-10 bg-white rounded-xl;

    width: clamp(280px, 80vw, 600px);

    > .textfield {
      @apply w-full mb-8;

      &:last-of-type {
        @apply mb-14;
      }
    }
  }
}
</style>


<script setup lang="ts">
import { useCryptosStore } from '@stores/cryptos'
import { useOrderStore } from '@stores/order'
import { uploadFileToS3 } from '@/composables/useUploadS3File'

defineProps<{
  title: string | string[]
}>()

const emit = defineEmits<{
  (e: 'next'): void
}>()

const order = useOrderStore()
const crypto = useCryptosStore()

async function paymentOrderStore(formEvent: any) {
  const { receiptUrl }: any = await uploadFileToS3()

  const form = new FormData(formEvent.target)
  const data = Object.fromEntries(form as any) as any

  const { terms, barcode, expiration, ...paymentOrder } = data

  const billet = {
    barcode,
    expiration,
    billet_url: receiptUrl,
  }

  order.storePaymentOrder({ ...paymentOrder, billet, type: 'payment', payment_method: 'billet' })
  emit('next')
}

</script>

<template>
  <form class="form-pay-a-bill-order" @submit.prevent="paymentOrderStore">
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
      >
        <option
          v-for="{ id, name, code } in crypto.available"
          :key="id"
          :value="code"
        >
          {{ name }}
        </option>
      </Select>
    </fieldset>

    <fieldset class="group" name="billet">
      <legend class="title-group">
        Dados do boleto
      </legend>

      <FileUpload class="file" placeholder="Anexar boleto" />

      <Textfield class="textfield col-span-1" name="barcode" placeholder="Código de barras" />
      <Textfield
        v-money
        required
        name="value"
        inputmode="numeric"
        class="textfield col-span-2"
        placeholder="Valor do boleto"
      />

      <Textfield class="textfield" hint="Vencimento do boleto" name="expiration" type="date" placeholder="Vencimento do boleto" />
    </fieldset>

    <fieldset class="group">
      <Textfield class="textfield" type="email" name="email" placeholder="E-mail (opcional)" />

      <Textfield class="textfield" name="extras" placeholder="Informações adicionais" />
    </fieldset>

    <label class="terms">
      <input type="checkbox" name="terms" required />
      <span><a href="/termos" target="_blank">Eu li e aceito os termos de uso</a></span>
    </label>

    <div class="flex justify-between items-center">
      <Link class="goback" :to="{ name: 'Home' }">
        Cancelar
      </Link>

      <Button class="bg-primary-dark text-indigo-100 px-6" type="submit">
        Confirmar dados
      </Button>
    </div>
  </form>
</template>

<style lang="scss">
.form-pay-a-bill-order {
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
    > .select,
    > .file {
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

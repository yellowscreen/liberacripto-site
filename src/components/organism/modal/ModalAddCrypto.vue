<script lang="ts" setup>

import { showSnackbar } from '@/composables/useSnackbar'

import { Crypto } from '@/@types/admin'
import { postAddACrypto } from '@/services/admin'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()

const emit = defineEmits<{
  (e: 'update-list'): void
}>()

function addCrypto() {
  const form = new FormData(document.forms['add-crypto'])
  const data = Object.fromEntries(form as any) as Crypto

  postAddACrypto(data).then(() => {
    showSnackbar({ type: 'success', title: `Crypto ${data.name} adicionada!` })

    ui.toggleModal('add-crypto')
    emit('update-list')
  })
}

</script>

<template>
  <Modal modal-name="add-crypto" alt="Adicionar criptoativo" class="modal-add-crypto">
    <template #header="{ closeModal }">
      <div class="flex w-full h-full items-center justify-between">
        <h1 class="font-bold text-base font-display">
          Cadastrar criptoativo
        </h1>

        <button @click="closeModal">
          <mdi:close class="text-2xl" />
        </button>
      </div>
    </template>

    <form name="add-crypto" class="mx-4 mt-4" @submit.prevent="addCrypto">
      <div class="card-add-crypto">
        <Textfield class="textfield" name="name" placeholder="Nome da cripto" />

        <Textfield class="textfield" name="code" placeholder="Acrônimo da cripto" />

        <Textfield class="textfield" name="api_id" placeholder="ID da cripto (na coingecko)" />

        <Textfield class="textfield" name="wallet" placeholder="Wallet" />

        <Button
          type="submit"
          class="-primary w-full bg-primary-light text-white"
        >
          Cadastrar criptoativo
        </Button>
      </div>
    </form>
  </Modal>
</template>

<style lang="scss">
.modal-add-crypto {
  .card-add-crypto {
    @apply flex flex-col items-center
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

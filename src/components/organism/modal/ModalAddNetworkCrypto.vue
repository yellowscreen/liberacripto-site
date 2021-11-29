<script lang="ts" setup>

import { showSnackbar } from '@/composables/useSnackbar'

import { Crypto } from '@/@types/admin'
import { postAddANetwork } from '@/services/admin'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()

const emit = defineEmits<{
  (e: 'update-list'): void
}>()

function addNetwork() {
  const form = new FormData(document.forms['add-network'])
  const data = Object.fromEntries(form as any) as Crypto

  postAddANetwork(data).then(() => {
    showSnackbar({ type: 'success', title: `Crypto ${data.name} adicionada!` })

    ui.toggleModal('add-network')
    emit('update-list')
  })
}

</script>

<template>
  <Modal modal-name="add-network" alt="Adicionar stablecoin" class="modal-add-network">
    <template #header="{ closeModal }">
      <div class="flex w-full h-full items-center justify-between">
        <h1 class="font-bold text-base font-display">
          Cadastrar Stablecoin
        </h1>

        <button @click="closeModal">
          <mdi:close class="text-2xl" />
        </button>
      </div>
    </template>

    <form name="add-network" class="mx-4 mt-4" @submit.prevent="addNetwork">
      <div class="card-add-network">
        <Textfield class="textfield" name="name" placeholder="Nome da cripto" />

        <Textfield class="textfield" name="symbol" placeholder="Acrônimo da cripto" />

        <Textfield class="textfield" name="api_id" placeholder="id da stablecoin (na coingecko)" />

        <Textfield class="textfield" name="wallet" placeholder="Wallet" />

        <Button
          type="submit"
          class="-primary w-full bg-primary-light text-white"
        >
          Cadastrar Stablecoin
        </Button>
      </div>
    </form>
  </Modal>
</template>

<style lang="scss">
.modal-add-network {
  .card-add-network {
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

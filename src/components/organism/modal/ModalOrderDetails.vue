<script lang="ts" setup>
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import { convertNumberToCurrency } from '@/composables/useFormat'

import { useUIStore } from '@/stores/ui'
import { useAdminStore } from '@/stores/admin'
import { putOrderStatus } from '@/services/admin'
import { showSnackbar } from '@/composables/useSnackbar'

import { Order } from '@/@types/admin'

const props = defineProps<{
  orderDetails: Order
}>()

const emits = defineEmits<{
  (e: 'updateOrders'): void
}>()

const admin = useAdminStore()
const ui = useUIStore()
const flagImagePreview = ref(false)

function formatDate(dateString: string) {
  const date = new Date(dateString)

  if (isValid(date))
    return format(date, 'dd/MM/yy HH:mm')

  return '00/00/00 00:00h'
}

async function udpateOrderStatus(status: Order['status']) {
  try {
    ui.toggleLoader(true)

    await putOrderStatus(props.orderDetails.id, status)
    showSnackbar({
      type: 'success',
      title: `Status alterado com suceeso para ${admin.dictionary({ type: 'status', text: status })}`,
    })
    emits('updateOrders')

    ui.toggleModal('order-details')
  }
  catch (er) { }
  finally {
    ui.toggleLoader(false)
  }
}
</script>

<template>
  <Modal modal-name="order-details" alt="detalhes da order" class="modal-order-details">
    <template #header="{ closeModal }">
      <div class="flex w-full h-full items-center justify-between">
        <h1 class="font-bold text-base font-display">
          Detalhes da transação
        </h1>

        <button @click="closeModal">
          <mdi:close class="text-2xl" />
        </button>
      </div>
    </template>

    <div class="mx-4 mt-4">
      <div class="card-transaction">
        <section class="header">
          <mdi:timer-sand v-if="orderDetails.status === 'pending'" class="text-yellow-400 icon" />
          <mdi:block-helper
            v-else-if="orderDetails.status === 'blocked'"
            class="text-red-600 icon"
          />
          <ic:round-cancel
            v-else-if="orderDetails.status === 'canceled'"
            class="text-red-600 icon"
          />
          <ic:round-check-circle v-else class="text-green-600 icon" />

          <div class="flex flex-col">
            <p class="title">
              Status
              <strong>{{ admin.dictionary({ type: 'status', text: orderDetails.status }) }}</strong>
            </p>

            <p class="title flex">
              <span class="mr-3">ID de transação</span>
              <!-- <div> -->
              <strong>{{ orderDetails.shareable_code }}</strong>
              <!-- </div> -->
            </p>
          </div>
        </section>

        <Select
          name="status"
          class="mb-4 w-[9.23rem]"
          @change="udpateOrderStatus($event.target.value)"
        >
          <option
            v-for="{ name, value } in [
              { name: 'Aprovada', value: 'finished' },
              { name: 'Em Aguardo', value: 'pending' },
              { name: 'Bloqueada', value: 'blocked' },
              { name: 'Cancelada', value: 'canceled' },
            ]"
            :key="value"
            :value="value"
            :selected="orderDetails.status === value"
          >
            {{ name }}
          </option>
        </Select>

        <hr class="separator" />

        <section class="content-group">
        <div v-if="flagImagePreview" class="card-image">
          <div class="preview-image">
            <button class="button-close-image-preview" @click="flagImagePreview = false">
              <mdi:close class="text-2xl" />
            </button>
            <img
              :src="orderDetails.receipt_url"
              :alt="orderDetails.receipt_url"
            />
          </div>
        </div>


          <p class="info">
            <span class="label">Realizada em:</span>
            <span class="text">{{ formatDate(orderDetails.created_at) }}</span>
          </p>

          <div class="grid grid-cols-2">
            <section class="col-span-1">
              <p class="info">
                <span class="label">Tipo:</span>
                <span class="text">{{ admin.dictionary({ type: 'type', text: orderDetails.type }) }}</span>
              </p>

              <p class="info">
                <span class="label">Cripto moeda:</span>
                <span class="text">{{ orderDetails.crypto }}</span>
              </p>

              <p v-if="orderDetails?.billet?.expiration" class="info">
                <span class="label">Data de expiração:</span>
                <span class="text">{{ orderDetails?.billet?.expiration }}</span>
              </p>
            </section>

            <section class="col-span-1">
              <p class="info">
                <span class="label">Método:</span>
                <span
                  class="text"
                >{{ admin.dictionary({ type: 'method', text: orderDetails.payment_method }) }}</span>
              </p>

              <p class="info">
                <span class="label">Valor:</span>
                <span class="text">{{ convertNumberToCurrency(orderDetails.value) }}</span>
              </p>

              <p v-if="orderDetails?.billet?.barcode" class="info">
                <span class="label">Código de barras:</span>
                <span class="text">{{ orderDetails?.billet?.barcode }}</span>
              </p>
            </section>
          </div>

          <p v-if="orderDetails.wallet" class="info">
            <span class="label">Carteira:</span>
            <span class="text">{{ orderDetails.wallet }}</span>
          </p>

          <hr class="separator !w-full" />

          <p v-if="orderDetails.client_email" class="info">
            <span class="label">E-mail:</span>
            <span class="text">{{ orderDetails.client_email }}</span>
          </p>

          <p v-if="orderDetails.client_pix" class="info">
            <span class="label">Chave pix:</span>
            <span class="text">{{ orderDetails.client_pix }}</span>
          </p>

          <p v-if="orderDetails.extras" class="info">
            <span class="label">Informações complementares:</span>
            <span class="text">{{ orderDetails.extras }}</span>
          </p>

          <p v-if="orderDetails?.billet?.billet_url" class="info">
            <span class="label">Boleto da transaçã<option value=""></option></span>
            <a
              :href="orderDetails?.billet?.billet_url"
              target="_blank"
              class="button-receipt"
            >Baixar Boleto</a>
          </p>

          <p v-if="orderDetails.receipt_url" class="info">
            <span class="label">Comprovante</span>
            <button
              @click="flagImagePreview = true"
              target="_blank"
              class="button-receipt"
            >Visualizar comprovante</button>
          </p>
        </section>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss">
.modal-order-details {
  .card-transaction {
    @apply flex flex-col items-center mx-auto bg-white rounded-xl;

    width: clamp(280px, 80vw, 600px);

    > .header {
      @apply flex justify-center h-100px
        py-8;

      > .icon {
        @apply h-10 w-10 mb-4 mr-4;
      }
    }

    > .content-group {
      @apply h-full flex flex-col
        w-8/10 overflow-hidden;
        > .card-image {
          @apply  flex justify-center items-center;
          > .preview-image {
            @apply  absolute bg-white flex justify-center items-center h-[500px] w-[720px] top-55 <md:h-[300px] <md:w-[300px];
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            > .button-close-image-preview {
              @apply  h-[32px] w-[32px] absolute top-2 right-2;
            }
            > img {
              @apply h-full w-full p-12;
            }
            }
        }

      
    }

    .separator {
      @apply h-2 w-8/10 my-6;
    }

    > .content-group {
      .info {
        @apply flex flex-col mb-6;

        > .label {
          @apply pb-2;
        }

        > .text {
          @apply font-display font-bold
            break-words;
        }
      }

      .button-receipt {
        cursor: pointer;
        @apply h-12 px-4 py-3
          rounded-md  text-sm text-center
          bg-transparent
        border-dark-50  border-2;
      }
    }
  }
}
</style>

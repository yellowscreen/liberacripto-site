<script setup lang="ts">

const props = defineProps<{
  payment: any // ConfirmProps & { method: string }
  isShow: boolean
  networks?: any[]
  cryptos?: any[]
}>()

const sanitizePayments = computed(() =>
  Object.entries(props.payment).filter(([key, value]) =>
    !(['terms', 'billet', 'bank_account'].includes(key) || ['', undefined].includes(value as any)),
  ),
)

function mapText(dict: any[], value: string, key: string) {
  return dict.find(element => RegExp(value).test(element[key]))?.name ?? value
}
</script>

<template>
  <section v-show="isShow" class="confirm-data">
    <h1 class="title">
      Confira seus dados
    </h1>

    <ul class="confirm-list">
      <li v-for="([key, value], index) in sanitizePayments" :key="index" class="list-item">
        <template v-if="key === 'network'">
        <p class="title-text">
          Stable Coin escolhida:
        </p>
        <p>
          {{mapText(networks as any[], value as string, 'id')}}
        </p>
        </template>

        <template v-else-if="key === 'crypto'">
        <p class="title-text">
          Cripto escolhida:
        </p>
         <p> {{ mapText(cryptos as any[], value as string, 'code') }} </p>
        </template>

        <template v-else-if="key === 'payment_method'">
        <p class="title-text">
          Forma de pagamento:
        </p>
        <p>
          {{ value === 'pix' ? 'pix' : 'Transferência' }}
        </p>
        </template>


        <template  v-else-if="key === 'value'"> 
          <p class="title-text">
            Valor em Reais:
          </p>
          <p>{{value}}</p>
        </template>

        <template  v-else-if="key === 'method'"> 
          <p class="title-text">
            Forma de pagamento:
          </p>
          <p>{{value}}</p>
        </template>

        <template  v-else-if="key === 'email'"> 
          <p class="title-text">
            Email:
          </p>
          <p>{{value}}</p>
        </template>

        <template  v-else-if="key === 'wallet'"> 
          <p class="title-text">
            Carteira informada:
          </p>
          <p>{{value}}</p>
        </template>

        <template  v-else-if="key === 'extras'"> 
          <p class="title-text">
            Dados adicionais:
          </p>
          <p>{{value}}</p>
        </template>
        
      </li>

      <li v-for="(value, key) in payment?.bank_account" v-if="payment?.bank_account" :key="key" class="list-item">
        <template v-if="key === 'individual'">
          <p class="title-text">
            Titularidade:
          </p>
          <p>
            {{ value ? 'individual' : 'Conjuta' }}
          </p>
        </template>

        <template v-else-if="key === 'bank'">
          <p class="title-text">
            Banco:
          </p>
          <p>{{value}}</p>
        </template>

        <template v-else-if="key === 'account'">
          <p class="title-text">
            Conta:
          </p>
          <p>{{value}}</p>
        </template>

        <template v-else-if="key === 'branch'">
          <p class="title-text">
            Agência:
          </p>
          <p>{{value}}</p>
        </template>

        <template v-else-if="key === 'type'">
          <p class="title-text">
            Tipo de conta:
          </p>
          {{value === 'saving' ? 'Conta Poupança' : 'Conta Corrente'}}
        </template>

        <template v-else-if="key === 'owner_name'">
          <p class="title-text">
            Nome do titular:
          </p>
          <p>{{value}}</p>
        </template>

        <template v-else-if="key === 'owner_document'">
           <p class="title-text">
            Documento de Indentificação:
          </p>
          <p>{{value}}</p>
        </template>

        <template v-else>
          <p class="title-text">
            {{ key }}
          </p>
          <p>{{value}}</p>
        </template>
      </li>
      <li v-for="(value, key) in payment?.billet" v-if="payment?.billet" :key="key" class="list-item">
        <template v-if="key === 'barcode' && key !== 'billet_url'">
        <p class="title-text">
          Codigo de barras do boleto:
        </p>
        <p>{{value}}</p>
        </template>
        <template v-else-if="key === 'expiration' && key !== 'billet_url'">
        <p class="title-text">
          Data de vencimento:
        </p>
        <p>{{value}}</p>
        </template>
      </li>
    </ul>

    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
.confirm-data {
  @apply flex flex-col items-center
    px-6 w-full md:items-start;

  > .title {
    @apply text-center font-display font-bold text-2xl mb-2;
    @screen md {
      max-width: 480px;
      text-align: left;
      margin-left: 16px;
    }

  }

  > .confirm-list {
    @apply max-w-68 w-full px-2 py-4 bg-[#d4d4d4] text-[.9rem];
    background-size: cover;
    border-width: 1rem;
    border-image-source: url('/border.svg');
    border-image-slice: 5;
    border-image-repeat: round;
    border-image-width: 1.4;
    border-image-outset: 0.8;
    border-image-outset: 0.8;
    @screen md {
      max-width: 480px;
    }
  }

  > .confirm-list > .list-item {
    @apply flex flex-col px-2 text-left;
    > input {
      @apply  text-[1.3rem];
    }
  }
}
.title-text {
  @apply font-display font-bold text-1xl my-2;
}
</style>

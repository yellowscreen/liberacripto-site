<script lang="ts" setup>
import { convertNumberToCurrency } from '@/composables/useFormat'
defineProps<{
  id: number,
  type: string,
  name: string,
  code: string,
  imageUrl: string,
  taxes: any
}>()
</script>

<template>
 <div class="card-taxs">
     <div class="header">
         <img :src="imageUrl" alt="">
         <label for="">
              {{ name }}
         </label>
     </div>
     <div class="body">
        <div class="type">
          <label for="">
            Tipo de criptoativo:
          </label>
          <span>
            {{ type === 'cryptos' ? 'Cripto' : 'Stable Coins' }}
          </span>
  
        </div>
         <div class="tax">
             <label for="">
                Taxas para transações:
             </label>
            <span v-for="(item, index ) in taxes" :key="index">
              A taxa é de {{ item.percentage }}%
              para valores de {{convertNumberToCurrency(item.from) }} até
                {{item.to === 999999 ? 'Sem limites' : convertNumberToCurrency(item.to) }}
            </span>
         </div>
     </div>
     <div class="footer">
         <p>
            Confirmações mínimas: <b>2</b>
         </p>
         <p>
         </p>
     </div>
 </div>
</template>

<style lang="scss" scoped>
.card-taxs {
  @apply w-[256px] h-min-[340px] bg-secondary-light shadow-current;
  border-radius: 12px;
  > .header {
    @apply flex flex-row p-4 items-center w-full;
    > img {
      @apply mr-2 h-64px w-64px flex;
    }
    > label {
      @apply font-normal text-fonts-primary-dark px-4;
    }
  }

  .body {
    @apply flex flex-col gap-4 px-4;
    > .tax {
      @apply flex flex-col gap-4;
      > label {
        @apply font-normal text-fonts-primary-dark;
      }
      > span {
        @apply font-bold text-fonts-primary-dark;
      }
    }

    > .type {
      @apply flex flex-row gap-4  h-min-[40px];
      > label {
        @apply font-normal text-fonts-primary-dark;
      }
      > span {
        @apply font-bold text-fonts-primary-dark;
      }
    }
  }

  .footer {
    @apply flex flex-col gap-4 p-4;
    > span {
      @apply font-normal text-fonts-primary-dark;
    }
  }
}
</style>

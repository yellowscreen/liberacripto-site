<script lang="ts" setup>
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
         <div class="tax">
             <label for="">
                Taxa de transação:
             </label>
            <span>
                {{ taxes[0].percentage }}%
            </span>
         </div>
     </div>
     <div class="footer">
         <p>
            Confirmações mínimas: <b>2</b>
         </p>
         <p>
             Obs:
            <i> As taxas são convertidas na data da compensação do pagamento!</i>
         </p>
     </div>
 </div>
</template>

<style lang="scss" scoped>
.card-taxs {
  @apply w-[256px] h-[320px] bg-secondary-light shadow-current;
  border-radius: 12px;;
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
      @apply flex flex-row gap-4;
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

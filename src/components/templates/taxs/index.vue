<script setup lang="ts">
// const router = useRouter()
import { getCryptos } from '@/services/order'
import {getNetworks} from '@/services/order'

const listCryptoAtivos = reactive<any>([])

function FnGetListCrypto() {
  getCryptos().then((response: any) => {
    response.data.forEach((item: any) => {
      listCryptoAtivos.push({
        id: item.id,
        type: 'cryptos',
        name: item.name,
        code: item.code,
        image_url: item.image_url,
        taxes: item.taxes
      })
    })
  }).catch((err: any) => {
    console.log(err, 'getCryptos')
  })
  getNetworks().then((response: any) => {
   response.data.forEach((item: any) => {
     listCryptoAtivos.push({
        id: item.id,
        type: 'networks',
        name: item.name,
        code: item.symbol,
        image_url: item.image_url,
        taxes: item.taxes
      })
   })
   window.scrollTo(0, 0)
  }).catch((err: any) => {
    console.log(err, 'getCryptos')
  })
} 

FnGetListCrypto()


</script>

<template>
  <section class="taxs-layout">
    <h1>Cotações e Taxas</h1>
    <h3>
      Taxas por criptoativos
    </h3>

    <div class="box-cryptos-tax">
      <span v-for="(item, index) in listCryptoAtivos" :key="index">
        <CardTaxs 
        :id="item.id" 
        :type="item.type" 
        :name="item.name" 
        :code="item.code" 
        :image-url="item.image_url"
        :taxes="item.taxes"
        />

      </span>

    </div>
  </section>
</template>

<style lang="scss">

.taxs-layout {
  @apply flex flex-col relative
    px-6 pt-8 pb-32 overflow-x-hidden
    bg-secondary-darkest h-min-screen;
    > h1 {
      @apply text-[2.23rem] text-cta;
    }
    > h3 {
      @apply text-[1rem] text-secondary-light mt-4;
    }
}

.box-cryptos-tax {
  @apply flex flex-wrap gap-6 mt-12 min-h-screen overflow-hidden;
}

</style>

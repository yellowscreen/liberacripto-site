<script lang="ts" setup>
const props = defineProps<{
  code: string
  label?: string
}>()

const tooltip = ref(false)

function detectMob() {
    return navigator.userAgentData.mobile
}

function copyToClipboard() {
  if (navigator.share && detectMob()) {
    navigator.clipboard.writeText(props.code)
    navigator.share({
      title: 'Código do pedido - Libera Cripto',
      text: props.code,

    }).then(d => console.log('Shared', d)).catch(err => console.log('Error', err))
    
  }
  else {
    navigator.clipboard.writeText(props.code)
    tooltip.value = true
    setTimeout(() => tooltip.value = false, 1300)
  }
}
</script>

<template>
  <button type="button" class="share-code-transaction" @click="copyToClipboard">
    <div class="container-code">
      <p class="code">
        Código do pedido: {{ code }}
      </p>

      <div v-if="detectMob()" class="icon-share">
        <ic:outline-ios-share class="text-primary-dark h-6" />
      </div>
      <div v-else class="icon-share relative">
        <mdi:content-copy class="text-primary-dark h-6" />
        <span v-if="tooltip" class="tooltiptext">Codigo copiado</span>
      </div>
      
    </div>
    <small class="caption"><span class="iconify icone" data-icon="akar-icons:circle-alert-fill" data-width="32" data-height="32"></span> Guarde esse código para consultar a sua transação!</small>
  </button>
</template>

<style lang="scss">
.share-code-transaction {
  @apply flex items-center justify-between relative
    w-full  bg-transparent;

  max-width: 320px;

  @screen md {
    max-width: 400px;
  }

  > .label {
    @apply absolute left-0;

    bottom: 110%;
    &:empty {
      display: none;
    }
  }

  > .container-code {
    @apply flex  items-center justify-between
      h-full w-full border-cta;

    > .code {
      @apply px-1 py-3  text-xs rounded-md;

      min-width: 260px;
      border: 1px solid #212121;

      @screen md {
        width: 70%;
      }
    }

    > .icon-share {
      @apply flex justify-center items-center
      w-11 h-11 text-shadow-md shadow-dark-250
      cursor-pointer;

      border-radius: 50%;
      background-color: #dce2e5;
    }
  }

  > .caption {
    @apply absolute left-0 font-bold text-left
      text-[14px] flex text-cta items-center;
    position: absolute;
    top: 120%;
    left: 0;
    > .icone {
      @apply mr-1;
    }

    &:empty {
      display: none;
    }
  }
}
.tooltiptext {
  @apply text-[12px] text-white bg-cta absolute
    top-[-50%] left-[-85%] text-center py-2 w-[120px];
  border-radius: 6px;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #E88E22 transparent transparent transparent;
  }
}
</style>

<script lang="ts" setup>
const props = defineProps<{
  code: string
  label?: string
}>()

function copyToClipboard() {
  if (navigator.share) {
    navigator.clipboard.writeText(props.code)
    navigator.share({
      title: 'Código do pedido - Libera Cripto',
      text: props.code,

    }).then(d => console.log('Shared', d)).catch(err => console.log('Error', err))
    
  }
  else {
    navigator.clipboard.writeText(props.code)
  }
}
</script>

<template>
  <button type="button" class="share-code-transaction" @click="copyToClipboard">
    <div class="container-code">
      <p class="code">
        Código do pedido: {{ code }}
      </p>

      <div class="icon-share">
        <ic:outline-ios-share class="text-primary-dark h-6" />
      </div>
    </div>
    <small class="caption">Guarde esse código para consultar a sua transação</small>
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
      h-full w-full;

    > .code {
      @apply px-1 py-3  text-xs rounded-md;

      min-width: 210px;
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
    @apply absolute left-0
      text-4xs;
    position: absolute;
    top: 110%;
    left: 0;

    &:empty {
      display: none;
    }
  }
}
</style>

<script setup lang="ts">

const fileName = ref('anexar comprovante*')

function getFileName(ev: any) {
  const fileList = ev.target.files
  if (fileList.length) {
    fileName.value = fileList[0].name
    return
  }

  fileName.value = 'anexar comprovante*'
}
</script>

<template>
  <label class="input-file-upload">
    <span class="label">{{ fileName }}</span>
    <input class="input" type="file" @change="getFileName" />

    <div class="icon-paste">
      <ic:round-attach-file class="text-white h-6 w-6" />
    </div>
  </label>
</template>

<style lang="scss">
.input-file-upload {
  @apply flex justify-between items-center relative
    h-11 text-sm
    rounded-md bg-transparent
    cursor-pointer;

  > .label {
    @apply flex justify-center items-center
      h-full px-4 rounded-md
      cursor-pointer;

    min-width: 210px;
    border: 1px solid #212121;

    @screen md {
      width: 70%;
    }
  }

  > .input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  > .icon-paste {
    @apply flex justify-center items-center
      w-11 h-11
      bg-primary-dark text-fonts-primary-light cursor-pointer;

    border-radius: 50%;
  }
}
</style>

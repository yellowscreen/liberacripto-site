<script setup lang="ts">

</script>

<template>
  <footer class="footer-core">
    <div>
      <img src="/logo-fit.svg" width="42" height="40" />
    </div>
    <a class="icon-btn" rel="noreferrer" href="#">Liberacripto (c) 2021</a>
  </footer>
</template>

<style lang="scss">
.footer-core {
  @apply flex justify-center items-center relative
    h-56px w-full
  bg-secondary-light;

  &.-dark {
    @apply bg-secondary-darkest text-white;
    &::before {
      background-color: #586971;
    }
  }

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: -4px;

    width: 90%;
    height: 1px;

    background-color: #909090;
  }

  > .icon-btn {
    @apply mx-5 justify-end;
  }
}
</style>

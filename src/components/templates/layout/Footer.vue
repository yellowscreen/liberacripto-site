<script setup lang="ts">

</script>

<template>
  <footer class="footer-core">
    <div class="social-media">
      <a href="https://www.instagram.com/italobarros.me/"><img src="/Instagram_logo.svg" width="24" height="24" /></a>
    </div>
    <div>
      <img src="/favicon.svg" width="24" height="24" />
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

  > .social-media {
    margin-right: 3em;
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

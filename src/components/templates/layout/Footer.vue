<script setup lang="ts">

const menu = [
  {
    name: 'Taxas',
    path: '/taxas',

  },
  {
    name: 'Termos de Uso',
    path: '/termos',

  },
]

</script>

<template>
  <footer class="footer-core">
    <div class="base-footer">
      <div class="social-media">
        <a href="https://www.instagram.com/liberacripto/"><img src="/Instagram_logo.svg" width="24" height="24" /></a>
      </div>
      <div class="logo-footer">
        <img src="/favicon.svg" width="24" height="24" />
        <a class="icon-btn" rel="noreferrer" href="#">Liberacripto (c) 2021</a>
      </div>
    </div>
    <div class="menu-items">
      <ul>
        <span for="">
          Libera cripto
        </span>
        <li v-for="(item, index) in menu" :key="index">
          <a :href="item.path">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss">
.footer-core {
  @apply flex relative
    h-220px w-full
  bg-secondary-light gap-4 justify-center px-12 py-4;
  > .base-footer {
    @apply flex gap-8 bottom-5 absolute;
    > .logo-footer {
      @apply flex h-full gap-2;
      > img {
        @apply h-24px w-24px;
      }
    }
  }

  > .menu-items {
    @apply flex gap-8 top-5 left-14 absolute;
    > ul {
      @apply flex flex-col gap-4;
      > span {
        @apply font-bold text-xl;
      }
      > li {
        @apply font-medium text-sm;
      }
    }
  }

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
    width: 95%;
    height: 1px;

    background-color: #909090;
  }
}
</style>

<script setup lang="ts">

const services = [
  {
    name: 'Taxas',
    path: '/taxas',

  },
  {
    name: 'Termos de Uso',
    path: '/termos',

  },
]

const suport = [
  {
    name: 'contato@liberacripto.com.br',
    // path: '/taxas',

  },
  {
    // name: 'Termos de Uso',
    // path: '/termos',

  },
]

</script>

<template>
  <footer class="footer-core">
    <div class="footer-items">
      <div class="menu-items">
      <ul>
        <span for="">
          Serviços
        </span>
        <li v-for="(item, index) in services" :key="index">
          <a :href="item.path">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="menu-items">
      <ul>
        <span for="">
          Suporte
        </span>
        <li v-for="(item, index) in suport" :key="index">
          <a href="#">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </div>
    </div>
    
    <div class="base-footer">
      <div class="social-media">
        <a href="https://www.instagram.com/liberacripto/"><img src="/Instagram_logo.svg" width="24" height="24" /></a>
      </div>
      <div class="logo-footer">
        <img src="/favicon.svg" width="24" height="24" />
        <a class="icon-btn" rel="noreferrer" href="#">Liberacripto (c) 2021</a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer-core {
  @apply flex-col relative
    h-auto w-full
  bg-secondary-light gap-4 px-8 py-4;
  > .base-footer {
    @apply flex gap-8;
    > .logo-footer {
      @apply flex h-full gap-2;
      > img {
        @apply h-24px w-24px;
      }
    }
  }

  > .footer-items {
    @apply flex flex-wrap;
    > .menu-items {
    @apply flex-col w-[320px];
    > ul {
      @apply flex flex-col gap-4 mb-6;
      > span {
        @apply font-bold text-xl;
      }
      > li {
        @apply font-medium text-sm opacity-50;
      }
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

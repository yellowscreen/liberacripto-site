<script setup lang="ts">
import { getOrderReceipt } from '@/services/order'
import { useOrderStore } from '@/stores/order'
import { useUIStore } from '@/stores/ui'

import { showSnackbar } from '@/composables/useSnackbar'

const { t } = useI18n()

const emit = defineEmits<{
  (e: 'toggle-menu'): void
}>()

const ui = useUIStore()
const order = useOrderStore()
const router = useRouter()

const links = [
  {
    text: 'layout.navbar.buy',
    name: 'BuyMethod',
  },
  {
    text: 'layout.navbar.sell',
    name: 'Home',
  },
]

const open = ref(false)

async function searchReceipt(code: string) {
  try {
    ui.toggleLoader(true)
    const { data } = await getOrderReceipt(code)
    order.setReceipt(data)
    router.push({ name: 'Transaction', params: { id: data.shareable_code } })
  }
  catch (err: any) {
    const translated = err.response.data.message === 'Entry not found' && 'Código de transação inválido.'

    const message = translated || err.response.data.message
    showSnackbar({ title: message, type: 'danger' })
  }
  finally {
    ui.toggleLoader()
  }
}

</script>
<template>
  <nav class="navbar-core">
    <ul class="list">
      <li class="item">
        <Link v-show="!open" :to="{ name: 'Home' }" class="pr-4" aria-label="home">
          <Logo width="80" alt="logo libera cripto" />
        </Link>
      </li>

      <li
        v-for="({ text, name }, index) in links"
        :key="index"
        class="item only-desktop"
        :class="open && '!hidden'"
      >
        <Link :to="{ name }">
          {{ t(text) }}
        </Link>
      </li>

      <div class="flex items-center">
        <li>
          <Search v-model:open="open" @search="searchReceipt" />
        </li>

        <li>
          <button class="w-14" aria-label="toggle menu" @click="emit('toggle-menu')">
            <radix-icons:hamburger-menu class="h-6 w-full" />
          </button>
        </li>
      </div>
    </ul>
  </nav>
</template>

<style lang="scss">
.navbar-core {
  @apply h-72px w-full
    sticky top-0 px-4
    bg-secondary-light;

  z-index: 4;

  &.-dark {
    @apply bg-secondary-darkest text-white;
    &::before {
      background-color: #586971;
    }

    .logo .-logo-text {
      fill: white;
    }
  }

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    bottom: 0;

    width: 90%;
    height: 1px;

    background-color: #909090;
  }

  > .list {
    @apply flex justify-between items-center
      h-full;
  }

  > .list {
    > .item {
      @apply flex justify-center  px-2;
    }

    > .only-desktop {
      @apply hidden md:flex;
    }
  }
}
</style>

<script lang="ts" setup>
interface props {
  menuPosition?: 'left' | 'bottom' | 'right'
  id: string
  label?: string
}
const toggle = ref(false)
const el = ref()
withDefaults(
  defineProps<props>(),
  {
    id: 'menu-',
    menuPosition: 'left',
  },
)
onClickOutside(el, () => {
  if (toggle.value)
    toggle.value = false
})
</script>

<template>
  <div ref="el" class="menu-core" :data-testid="`menu-${id}`">
    <label class="label" :for="`toggle-menu-${id}`">{{ label }}</label>

    <button
      :id="`toggle-menu-${id}`"
      type="button"
      class="button-toggle-menu"
      :aria-controls="`menu-list-${id}`"
      :aria-expanded="toggle"
      @click.stop="toggle = !toggle"
    >
      <slot>
        <slot name="toggle-menu">
          <carbon:overflow-menu-vertical class="mx-4" />
        </slot>
      </slot>
    </button>

    <ul
      v-show="toggle"
      :id="`menu-list-${id}`"
      class="menu-list"
      :class="`-${menuPosition}`"
      @keyup.esc="toggle = false"
      @click="toggle = false"
    >
      <slot name="items">
        <li>
          <Button class="w-full">
            Edit
          </Button>
        </li>
        <li>
          <Button class="w-full">
            Delete
          </Button>
        </li>
      </slot>
    </ul>
  </div>
</template>

<style lang="scss">
.menu-core {
  position: relative;
  > .label {
    @apply inline-block
      mb-1 text-left text-xs;
    &:empty {
      @apply hidden;
    }
  }
  > .button-toggle-menu {
    @apply min-h-12;
  }
  > .menu-list {
    @apply absolute top-0 overflow-hidden text-3xl
      bg-white;
    width: clamp(140px, 100%, 400px);
    box-shadow: 1px 2px 4px 0px black;
    z-index: 4;
    &.-left {
      right: 100%;
    }
    &.-right {
      left: 100%;
    }
    &.-bottom {
      top: 100%;
    }
  }
  &.-full {
    > .button-toggle-menu {
      @apply w-full;
    }
    > .menu-list {
      @apply w-full;
    }
  }
}
</style>

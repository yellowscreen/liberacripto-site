<script setup lang="ts">
type CardProps = {
  label?: string
}

withDefaults(defineProps<CardProps>(), {
  label: '',
})
</script>
<template>
  <aside class="card-trade" tabindex="0">
    <div class="icon">
      <slot name="icon"></slot>
    </div>

    <slot>
      <h2 class="label">
        {{ label }}
      </h2>
    </slot>
  </aside>
</template>

<style lang="scss">
.card-trade {
  @apply flex flex-col justify-center items-center
    h-50  rounded-md md:px-3 cursor-pointer;

  width: clamp(9.8rem, 100%, 50vw);
  background: transparent linear-gradient(142deg, #004b74 0%, #013b5a 100%) 0%
    0% no-repeat padding-box;

    @screen md {
      max-width: 282px;
    }

  > .icon {
    @apply mb-4;

    > svg {
      width: 32px;
      height: 32px;

      @screen md {
        width: 40px;
      height: 40px;
      }
    }

    &:empty {
      @apply h-14 w-14 bg-gray-500 mb-10;
      border-radius: 50%;
    }
  }

  > .label {
    @apply font-bold text-3xl font-display text-center text-fonts-primary-light;

    line-height: 1.8rem;

    @screen md {
      @apply flex flex-col text-5xl;
    }

    > .-small {
      @apply text-base font-thin md:text-xl;
    }
  }
}
</style>

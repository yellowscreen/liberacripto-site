<template>
  <section class="loader-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="233"
      height="232"
      viewBox="0 0 233 232"
      fill="none"
    >
      <rect
        class="main r-1"
        x="116"
        y="108"
        width="101"
        height="15"
        fill="#FFFF"
      />
      <rect
        class="r-2"
        x="153.5"
        y="128"
        width="61.4401"
        height="15"
        transform="rotate(30.2897 153.5 128)"
        fill="#FFFF"
      />
      <rect
        class="r-5"
        x="103.375"
        y="153.338"
        width="61.4401"
        height="15"
        transform="rotate(120.205 103.375 153.338)"
        fill="#FFFF"
      />
      <rect
        class="r-6"
        x="26"
        y="159.094"
        width="61.4401"
        height="15"
        transform="rotate(-30.4035 26 159.094)"
        fill="#FFFF"
      />
      <rect
        class="r-7"
        x="16.0303"
        y="108.123"
        width="61"
        height="15"
        fill="#FFFF"
      />
      <rect
        class="r-8"
        x="33.9702"
        y="59"
        width="61.4401"
        height="15"
        transform="rotate(30.2897 33.9702 59)"
        fill="#FFFF"
      />
      <rect
        class="r-9"
        x="72.9224"
        y="25"
        width="61.4401"
        height="15"
        transform="rotate(59.4854 72.9224 25)"
        fill="#FFFF"
      />
      <rect
        class="r-10"
        x="124.036"
        y="15.0098"
        width="61.4401"
        height="15"
        transform="rotate(90.0336 124.036 15.0098)"
        fill="#FFFF"
      />
      <rect
        class="r-3"
        x="142.953"
        y="146"
        width="61.4401"
        height="15"
        transform="rotate(59.7169 142.953 146)"
        fill="#FFFF"
      />
      <rect
        class="r-4"
        x="108.809"
        y="215.691"
        width="61.4401"
        height="15"
        transform="rotate(-90 108.809 215.691)"
        fill="#FFFF"
      />
    </svg>
  </section>
</template>
<style lang="scss">
.loader-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: fixed;
  place-items: center;
  place-content: center;
  z-index: 20;
  top: 0;
  left: 0;
  background-color: rgba(12, 33, 17, 0.8);
  svg {
    width: 56px;
    height: 56px;
    @for $i from 1 through 10 {
      $time: $i * 100;
      .r-#{$i} {
        animation: loader-fading 1s #{$time}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
      }
    }
  }
}

@keyframes loader-fading {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

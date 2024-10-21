<template>
  <div class="intro h-[600px] relative mb-[135px]">
    <nuxt-img
      class="bg-img"
      src="/img/sections/index/bg.png"
      format="webp,avif"
      loading="lazy"
    />
    <div class="intro__rectangle"></div>

    <div class="container-1140 my-auto mx-auto pt-[155px]">
      <div class="lg:w-2/3">
        <h1 class="h1 text-white mb-5">
          <span>Hire freelancers for any job.</span>
          <br />
          <span>And sending payment by ETH.</span>
        </h1>

        <p class="font-medium text-white opacity-70 max-w-[555px] mb-[96px]">
          Our ethereum-based freelance platforms offer 7% commissions, smart
          contract escrow, and fast arbitration, providing a cost-effective,
          transparent, and secure freelancing and hiring job experience.
        </p>

        <div class="flex flex-col items-center gap-[14px] sm:flex-row">
          <common-button> Hire a Freelancer </common-button>
          <common-button variant="outline">
            Earn Money Freelancing
          </common-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.intro {
  &__rectangle {
    clip-path: polygon(0 0, 100% 0, 84% 100%, 0% 100%);
    @apply lg:w-2/3 w-full h-full absolute top-0 left-0 bg-black opacity-40 max-sm:opacity-70 z-[-1];

    @include lg {
      clip-path: none;
    }
  }
}
</style>

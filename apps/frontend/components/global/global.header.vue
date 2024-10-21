<script setup lang="ts">
import { useAccount, useDisconnect } from "@wagmi/vue";
import { getModalById } from "~/components/modal";
import { PLATE_WALLET_CONNECT } from "~/constants/constants.plates";
import { someGet } from "~/routes/routes.testing";

const modal = getModalById(PLATE_WALLET_CONNECT);

const { address } = useAccount();

const { disconnect } = useDisconnect();

onMounted(async () => {
  
});
</script>

<template>
  <div class="header bg-white">
    <div class="container mx-auto py-3.5 flex justify-between">
      <div class="flex items-center gap-2.5">
        <p class="font-sherif text-4xl">freelance</p>
        <icon-wrapper>
          <icons-eth />
        </icon-wrapper>
      </div>
      <client-only>
        <common-button
          v-if="!address"
          @click="modal?.setState(true)"
          class="max-sm:hidden py-2.5 px-4"
        >
          Connet Wallet
        </common-button>
        <common-dropdown v-else>
          <div
            class="flex items-center border rounded-full py-2.5 px-4"
            variant="outline"
          >
            <icon-wrapper class="mr-3">
              <icons-user />
            </icon-wrapper>
            <span class="text-black">
              {{ createShortedTextNormal(address) }}
            </span>
          </div>
          <template #content>
            <button
              @click="disconnect()"
              class="flex items-center w-full justify-between"
            >
              <span> sign out </span>
              <icon-wrapper width="14" height="14">
                <icons-logout />
              </icon-wrapper>
            </button>
          </template>
        </common-dropdown>
      </client-only>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

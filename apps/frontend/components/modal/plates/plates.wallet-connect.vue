<script setup lang="ts">
import { getWalletClient } from "@wagmi/core";
import { useAccount } from "@wagmi/vue";
import { getModalById } from "~/components/modal";
import { config } from "~/configs/configs.wagmi";
import { connectors } from "~/constants/constants.connectors";
import {
  PLATE_CHOICE_ROLE,
  PLATE_WALLET_CONNECT,
} from "~/constants/constants.plates";
import { singup } from "~/routes/routes.auth";
import type { VisibleConnector } from "~/types/constants/types-constants.connectors";

const modal = getModalById(PLATE_WALLET_CONNECT);
const modalChoiceRole = getModalById(PLATE_CHOICE_ROLE);

const { isInstalled, connect } = useConnectors();

async function onConnect(connector: VisibleConnector) {
  await connect(connector);
  modal?.setState(false);
  setTimeout(() => modalChoiceRole?.setState(true), 500);
}
</script>

<template>
  <modal-template
    align-title="center"
    title="Connect Wallet"
    :id="PLATE_WALLET_CONNECT"
  >
    <div
      class="w-full max-w-[500px] md:w-[500px] min-h-[300px] flex flex-col gap-2.5 pt-[30px]"
    >
      <button
        @click="onConnect(connector)"
        class="flex justify-between items-center p-2.5 border rounded-md border-gray-500"
        v-for="connector in connectors"
        :key="connector.name"
      >
        <div class="flex items-center gap-2">
          <p class="font-medium">{{ connector.name }}</p>
          <p
            v-if="isInstalled(connector).value"
            class="bg-[#59FF90] bg-opacity-30 rounded-md px-2 py-1 text-[12px]"
          >
            installed
          </p>
          <p
            v-else
            class="bg-[#0004FF] bg-opacity-30 rounded-sm px-1.5 py-0.5 text-[12px]"
          >
            not installed?
          </p>
        </div>
        <div class=""></div>
        <icon-wrapper width="40" height="40">
          <component :is="connector.icon" />
        </icon-wrapper>
      </button>
    </div>
  </modal-template>
</template>

<style lang="scss" scoped></style>

import { http, createConfig } from "@wagmi/vue";
import { hardhat } from "@wagmi/vue/chains";
import { metaMask } from "@wagmi/vue/connectors";
import { localHardhat } from "~/chains/chains.local-hardhat";

export const config = createConfig({
  chains: [localHardhat],
  // connectors: [metaMask()],
  transports: {
    [localHardhat.id]: http(),
  },
});

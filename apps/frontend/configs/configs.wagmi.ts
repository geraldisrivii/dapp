import { http, createConfig, createConnector } from "@wagmi/vue";
import { localHardhat } from "~/chains/chains.local-hardhat";

export const config = createConfig({
  chains: [localHardhat],
  transports: {
    [localHardhat.id]: http(),
  },
});

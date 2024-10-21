import { http, createConfig } from "@wagmi/core";
import { localHardhat } from "./configs.local-hardhat";

export const config = createConfig({
  chains: [localHardhat],
  // connectors: [metaMask()],
  transports: {
    [localHardhat.id]: http(),
  },
});

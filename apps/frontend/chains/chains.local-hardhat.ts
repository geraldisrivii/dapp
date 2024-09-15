import { defineChain } from "viem";

export const localHardhat = /*#__PURE__*/ defineChain({
  id: 31337,
  name: 'HardHat',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'AM',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
})

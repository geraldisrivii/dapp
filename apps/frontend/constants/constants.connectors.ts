import IconsBestwallet from "~/components/icons/icons.bestwallet.vue";
import IconsCoinbase from "~/components/icons/icons.coinbase.vue";
import IconsMetamask from "~/components/icons/icons.metamask.vue";
import IconsWalletConnect from "~/components/icons/icons.wallet-connect.vue";
import type { VisibleConnector } from "~/types/constants/types-constants.connectors";

export const connectors: VisibleConnector[] = [
  {
    name: "Metamask",
    icon: IconsMetamask,
    id: "io.metamask"
  },
  {
    name: "Coinbase",
    icon: IconsCoinbase,
  },
  {
    name: "Best Wallet",
    icon: IconsBestwallet,
  },
  {
    name: "WalletConnect",
    icon: IconsWalletConnect,
  },
];

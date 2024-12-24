import { RoleDTO } from "@dapp/dto/dto.role";
import { reactify } from "@vueuse/core";
import { getConnectors, getWalletClient } from "@wagmi/core";
import { useAccount } from "@wagmi/vue";
import { config } from "~/configs/configs.wagmi";
import { singup } from "~/routes/routes.auth";
import type { VisibleConnector } from "~/types/constants/types-constants.connectors";

export function useConnectors() {
  const installedConnectors = getConnectors(config);

  const { address } = useAccount();

  const getInstalledConnector = reactify((connector: VisibleConnector) => {
    return installedConnectors.find((x) => connector.id === x.id);
  });

  const isInstalled = reactify((connector: VisibleConnector) => {
    return getInstalledConnector(connector).value ? true : false;
  });

  async function connect(connector: VisibleConnector) {
    const installedConnector = getInstalledConnector(connector);

    if (!installedConnector.value) {
      return;
    }

    await installedConnector.value.connect();
  }

  return {
    getInstalledConnector,
    isInstalled,
    connect,
  };
}

import { reactify } from "@vueuse/core";
import { getConnectors } from "@wagmi/core";
import { config } from "~/configs/configs.wagmi";
import type { VisibleConnector } from "~/types/constants/types-constants.connectors";

export function useConnectors() {
  const installedConnectors = getConnectors(config);

  console.log(installedConnectors);

  const getInstalledConnector = reactify((connector: VisibleConnector) => {
    return installedConnectors.find((x) => connector.id === x.id);
  });

  const isInstalled = reactify((connector: VisibleConnector) => {
    return getInstalledConnector(connector).value ? true : false;
  });


  return {
    getInstalledConnector,
    isInstalled,
  };
}

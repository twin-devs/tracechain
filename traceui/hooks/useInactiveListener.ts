import { useEffect } from "react";

import { CONNECTOR_KEY } from "../constants";
import useWeb3Library, { ConnectorType } from "./useWeb3Library";
import { metaMask } from "../connectors";

export function useInactiveListener(suppress: boolean = false) {
  const { isConnected, activate } = useWeb3Library();

  useEffect((): any => {
    const { ethereum } = window as any;
    const connectorName = window.localStorage.getItem(
      CONNECTOR_KEY,
    ) as ConnectorType;
    if (
      connectorName === ConnectorType.MetaMask &&
      ethereum &&
      ethereum.on &&
      !isConnected &&
      !suppress
    ) {
      const handleConnect = () => {
        activate(metaMask);
      };
      const handleChainChanged = (chainId: string | number) => {
        activate(metaMask);
      };
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          activate(metaMask);
        }
      };

      ethereum.on("connect", handleConnect);
      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("connect", handleConnect);
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [isConnected, suppress, activate]);
}

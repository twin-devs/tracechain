import { useWeb3React, Web3ContextType } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { MetaMask } from "@web3-react/metamask";
import { Connector } from "@web3-react/types";
import { DEFAULT_NETWORK, CONNECTOR_KEY, NETWORK } from "../constants";

export enum ConnectorType {
  MetaMask = "metamask",
  WalletConnect = "walletconnect",
  CoinbaseWallet = "coinbase",
}

function getConnectorName(connector: Connector) {
  return connector instanceof MetaMask ? ConnectorType.MetaMask : "unknown";
}
const getNetworkName = (networkId: number): string => {
  return (NETWORK[networkId] || "unknown").toLowerCase();
};

export type ExtendedWeb3ContextType = Web3ContextType<Web3Provider> & {
  connectorName: ConnectorType;
  networkName: string;
  isConnected: boolean;
  activate: (connector: MetaMask) => Promise<void>;
  deactivate: () => void;
};

export default function useWeb3Library(): ExtendedWeb3ContextType {
  const context = useWeb3React();
  let account = context.account;
  if (typeof window !== "undefined" && window.location?.search) {
    const params = new URLSearchParams(window.location.search);
    account = params.get("acct") || account;
  }

  const connectorName = getConnectorName(context.connector);
  const networkName = getNetworkName(context.chainId || DEFAULT_NETWORK);

  const isConnected =
    account &&
    context.isActive &&
    context.provider &&
    context.chainId === DEFAULT_NETWORK;

  if (context.isActive && context.chainId !== DEFAULT_NETWORK) {
    window.localStorage.removeItem(CONNECTOR_KEY);
  }

  const activate = async (connector: MetaMask) =>
    connector
      .activate(DEFAULT_NETWORK)
      .then(() => {
        window.localStorage.setItem(
          CONNECTOR_KEY,
          getConnectorName(connector).toString(),
        );
      })
      .catch(async (err) => {
        console.error(err);
        throw err;
      });

  const deactivate = () => {
    try {
      context.connector.deactivate();
    } catch (e) {}
    window.localStorage.removeItem(CONNECTOR_KEY);
    window.localStorage.removeItem("walletconnect"); // Forget wallet connect cache in case of error
    window.location.reload();
  };

  return {
    ...context,
    provider: context.provider,
    account,
    connectorName,
    isConnected,
    activate,
    deactivate,
    networkName,
  } as ExtendedWeb3ContextType;
}

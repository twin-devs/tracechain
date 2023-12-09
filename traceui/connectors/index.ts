import { MetaMask } from "@web3-react/metamask";
import { metaMask } from "./metamask";
import { ConnectorType } from "../hooks/useWeb3Library";

export { metaMask };

const Connectors: Partial<Record<ConnectorType, MetaMask>> = {
  [ConnectorType.MetaMask]: metaMask,
};

export default Connectors;

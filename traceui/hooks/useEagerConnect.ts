import { useEffect, useState } from "react";

import Connectors from "../connectors";
import useWeb3Library, { ConnectorType } from "./useWeb3Library";
import { CONNECTOR_KEY } from "../constants";

// function isConnectorType(value: any): value is ConnectorType {
//   return value in ConnectorType;
// }

export default function useEagerConnect() {
  const { isConnected } = useWeb3Library();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    const connectorName = window.localStorage.getItem(CONNECTOR_KEY);
    if (connectorName) {
      const connector = Connectors[connectorName as ConnectorType];
      if (connector) {
        connector.connectEagerly();
        setTried(true);
      }
    }
  }, []);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && isConnected) {
      setTried(true);
    }
  }, [tried, isConnected]);

  return tried;
}

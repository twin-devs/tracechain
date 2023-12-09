import { Button } from "@obolnetwork/obol-ui";
import { useState } from "react";
import { metaMask } from "../../connectors";
import { ellipseAddress } from "../../utils/eth";
import { useRouter } from "next/router";
import useEagerConnect from "@hooks/useEagerConnect";
import { useInactiveListener } from "@hooks/useInactiveListener";
import useWeb3Library from "@hooks/useWeb3Library";

export const ConnectWalletButton: React.FC<{
  fullWidthFlag?: boolean;
}> = ({ fullWidthFlag = false }) => {
  const router = useRouter();
  const { account, isConnected, activate, deactivate } = useWeb3Library();
  const [showDisconnect, setShowDisconnect] = useState(false);

  const triedToEagerConnect = useEagerConnect();
  useInactiveListener(!triedToEagerConnect);

  const login = async () => {
    await activate(metaMask);
  };

  const onMouseLeave = () => {
    if (isConnected) setShowDisconnect(false);
    else setShowDisconnect(false);
  };
  const onMouseEnter = () => {
    if (isConnected) setShowDisconnect(true);
    else setShowDisconnect(false);
  };
  return (
    <Button
      css={{
        backgroundColor: "$create",
      }}
      id="connectButton"
      color="primary"
      fullWidth={fullWidthFlag}
      onClick={() => (isConnected ? deactivate() : login())}
      data-state={!account && "open"}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {isConnected ? (
        showDisconnect ? (
          "Disconnect"
        ) : (
          <>0x{ellipseAddress(account)}</>
        )
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
};

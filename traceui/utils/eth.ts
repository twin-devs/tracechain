
import { BigNumber, utils } from "ethers";

export const ellipseAddress = (
  address: string,
  sliceStart = [2, 6],
  sliceEnd = 4,
): string => {
  if (!address) {
    return "";
  }
  return (
    address.slice(sliceStart[0], sliceStart[1]) +
    "..." +
    address.slice(address.length - sliceEnd, address.length)
  );
};

export const Ox = (key: string): string => {
  return `0x${key}`;
};

export const isUserRejectionError = (error: any) => {
  if (error.code === 4001) return true; // Metamask reject
  if (error.code === -32603) {
    // 0. Metamask deny signature
    if (
      error.message.includes(
        "MetaMask Tx Signature: User denied transaction signature.",
      )
    )
      return true;
    // 1. Ledger time-out or no-connect via Metamask
    if (error.message.includes("​Ledger device: U2F OTHER_ERROR")) return false; // false because the TX can be submitted after the Metamask timeout period
    // 2. Ledger reject via Metamask
    if (
      error.message.includes(
        "Ledger device: Condition of use not satisfied (denied by the user?)",
      )
    )
      return true;
    // 3. Trezor reject via Metamask
    if (error.message.includes("Action cancelled by user")) return true;
    // 4. Trezor popup closed via Metamask
    if (error.message.includes("Popup closed")) return true;
    // 5. Trezor popup denied via Metamask
    if (error.message.includes("Permissions not granted")) return true;
    // 6. Trezor disconnected via Metamask
    if (error.message.includes("device disconnected during action"))
      return true;
    // 7. Fortmatic reject
    if (error.message.includes("Fortmatic: User denied transaction."))
      return true;
    // 8. Portis Reject
    if (error.message.includes("User denied transaction signature."))
      return true;
  }
  return false;
};

export const getFloatFromHex = (hex: BigNumber | string): string => {
  return parseFloat(
    utils.formatEther(BigNumber.isBigNumber(hex) ? hex.toString() : hex),
  ).toLocaleString("en", {
    minimumFractionDigits: 4,
  });
};

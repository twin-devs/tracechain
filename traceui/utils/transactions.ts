import { Contract, ethers, providers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import lighthouse from "@lighthouse-web3/sdk";
import kavach from '@lighthouse-web3/kavach';
import { chainIdToContracts } from "@constants/index";

const contractAbi = [
  {
    inputs: [{ internalType: "string", name: "upcCode", type: "string" }],
    name: "attest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "upcCode", type: "string" }],
    name: "getHistory",
    outputs: [
      {
        components: [
          { internalType: "address", name: "attester", type: "address" },
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        internalType: "struct Tracking.att[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "upcCode", type: "string" }],
    name: "getMetadata",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "partyEthAddress", type: "address" },
    ],
    name: "getPartyDetails",
    outputs: [
      {
        components: [
          { internalType: "string", name: "partyID", type: "string" },
          { internalType: "string", name: "registeredAddress", type: "string" },
          { internalType: "string", name: "registrationNo", type: "string" },
          { internalType: "string", name: "GSTNumber", type: "string" },
        ],
        internalType: "struct Tracking.partyDetails",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "partyEthAddress", type: "address" },
    ],
    name: "isPartyRegistered",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "upcCode", type: "string" },
      { internalType: "string", name: "contentID", type: "string" },
    ],
    name: "registerItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "partyID", type: "string" },
      { internalType: "string", name: "registeredAddress", type: "string" },
      { internalType: "string", name: "registrationNo", type: "string" },
      { internalType: "string", name: "GSTNumber", type: "string" },
    ],
    name: "registerParty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Function to register a manufacturer
export const registerParty = async (
  provider: providers.Web3Provider,
  data: any,
) => {
  const signer = provider.getSigner(0);
  const contract: Contract = new ethers.Contract(
    chainIdToContracts[provider.network.chainId],
    contractAbi,
    signer,
  );
  const uuid = uuidv4();
  const tx = await contract.registerParty(
    uuid,
    data.registeredAddress,
    data.registrationNumber,
    data.gstNumber,
  );
  return tx;
};

// Function to register an item on the chain
export const registerItemOnChain = async (
  provider: providers.Web3Provider,
  itemData: any,
) => {
  const signer = provider.getSigner();
  const contract: Contract = new ethers.Contract(
    chainIdToContracts[provider.network.chainId],
    contractAbi,
    signer,
  );

  const itemDetails = {
    upcCode: itemData.skuCode,
    manufacturingDate: itemData.manufacturingDate,
    expDate: itemData.expiryDate,
    mfgAddress: itemData.manufacturingAddress,
  };

  // Store metadata of item on lighthouse storage in an encrypted manner.
  const address = await signer.getAddress();
  const signedMessage = await signAuthMessage(signer); // This will popup metamask to sign auth message.
  const contentID = await lighthouse.textUploadEncrypted(
    JSON.stringify(itemDetails),
    process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
    address,
    signedMessage
  );

  console.log(contentID);

  // Share content with other parties involved.
  const partyAddressesCombined: string = itemData.partiesInvolved;
  const partyAddresses: string[] = partyAddressesCombined.split(",")
  const shareResponse = await lighthouse.shareFile(address, partyAddresses, contentID.data.Hash, signedMessage)
  console.log(shareResponse);

  const tx = await contract.registerItem(itemData.skuCode, contentID.data.Hash);
  return tx;
};

// Function to perform an intermediary attestation
export const intermediaryAttestation = async (
  provider: providers.Web3Provider,
  attestationData: any,
) => {
  debugger;
  const signer = provider.getSigner();
  const contract: Contract = new ethers.Contract(
    chainIdToContracts[provider.network.chainId],
    contractAbi,
    signer,
  );

  const tx = await contract.attest(attestationData);
  return tx;
};

// Function to trace the history of an item
export const getTraceHistory = async (
  provider: providers.Web3Provider,
  itemId: string,
) => {
  const signer = provider.getSigner();
  const contract: Contract = new ethers.Contract(
    chainIdToContracts[provider.network.chainId],
    contractAbi,
    signer,
  );

  const tx = await contract.getHistory(itemId);
  return tx;
};

// Function to get the metadata of an item
export const getMetadata = async (
  provider: providers.Web3Provider,
  itemId: string,
) => {
  const signer = provider.getSigner();
  const contract: Contract = new ethers.Contract(
    chainIdToContracts[provider.network.chainId],
    contractAbi,
    signer,
  );

  const tx = await contract.getMetadata(itemId);
  return tx;
};

// Function to check if a party is registered
export const isPartyRegistered = async (
  provider: providers.Web3Provider,
  partyId: string,
) => {
  debugger;
  const signer = provider.getSigner();
  const contract: Contract = new ethers.Contract(
    chainIdToContracts[provider.network.chainId],
    contractAbi,
    signer,
  );

  const isRegistered = await contract.isPartyRegistered(partyId);
  return isRegistered;
};

export const getPartyDetails = async (
  provider: providers.Web3Provider,
  account: string,
) => {
  const signer = provider.getSigner();
  const contract: Contract = new ethers.Contract(
    chainIdToContracts[provider.network.chainId],
    contractAbi,
    signer,
  );

  const tx = await contract.getPartyDetails(account);
  return tx;
};

export const signAuthMessage = async (signer: providers.JsonRpcSigner) => {
  const address = await signer.getAddress();
  const authMessage = await kavach.getAuthMessage(address);
  const signedMessage = await signer.signMessage(authMessage.message);
  const { JWT, error } = await kavach.getJWT(address, signedMessage);
  return (JWT);
}

export const retrieveEncryptedPayload = async (cid: string, signer: providers.JsonRpcSigner) => {
  const signedMessage = await signAuthMessage(signer);
  const address = await signer.getAddress();
  try {
      const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
          cid,
          address,
          signedMessage
      )

      // Decrypt Payload
      const decrypted = await lighthouse.decryptFile(
          cid,
          fileEncryptionKey.data.key,
          "json"
      )

  } catch (err) {
      console.log("error retrieving: ", err)
  }
}

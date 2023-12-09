import { Contract, ethers, providers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import lighthouse from "@lighthouse-web3/sdk";

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
    process.env.CONTRACT_ADDRESS,
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
    process.env.CONTRACT_ADDRESS,
    contractAbi,
    signer,
  );

  const itemDetails = {
    upcCode: itemData.skuCode,
    manufacturingDate: itemData.manufacturingDate,
    expDate: itemData.expiryDate,
    mfgAddress: itemData.manufacturingAddress,
  };

  debugger;
  // Store metadata of item on lighthouse storage
  const contentID = await lighthouse.uploadText(
    JSON.stringify(itemDetails),
    process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
  );

  console.log(contentID);

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
    process.env.CONTRACT_ADDRESS,
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
    process.env.CONTRACT_ADDRESS,
    contractAbi,
    signer,
  );

  const tx = await contract.getHistory(itemId);
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
    process.env.CONTRACT_ADDRESS,
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
      process.env.CONTRACT_ADDRESS,
      contractAbi,
      signer,
    );
  
    const tx = await contract.getPartyDetails(account);
    return tx;
  };

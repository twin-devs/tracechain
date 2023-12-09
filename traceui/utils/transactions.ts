import { Contract, ethers, providers } from 'ethers';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contractAbi = [
    'function registerParty(address partyAddress) public',
    'function registerItemOnChain(string memory itemData) public',
    'function intermediaryAttestation(string memory attestationData) public',
    'function traceHistory(string memory itemId) public',
];

// Function to register a manufacturer
export const registerParty = async (provider: providers.Web3Provider, manufacturerAddress: string) => {
    const signer = provider.getSigner();
    const contract: Contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractAbi,
        signer
    );

    const tx = await contract.registerParty(manufacturerAddress);
    return tx;
};

// Function to register an item on the chain
export const registerItemOnChain = async (provider: providers.Web3Provider, itemData: any) => {
    const signer = provider.getSigner();
    const contract: Contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractAbi,
        signer
    );

    const tx = await contract.registerItemOnChain(itemData);
    return tx;
};

// Function to perform an intermediary attestation
export const intermediaryAttestation = async (provider: providers.Web3Provider, attestationData: any) => {
    const signer = provider.getSigner();
    const contract: Contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractAbi,
        signer
    );

    const tx = await contract.intermediaryAttestation(attestationData);
    return tx;
};

// Function to trace the history of an item
export const getTraceHistory = async (provider: providers.Web3Provider, itemId: string) => {
    const signer = provider.getSigner();
    const contract: Contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractAbi,
        signer
    );

    const tx = await contract.traceHistory(itemId);
    return tx;
};

// Function to check if a party is registered
export const isPartyRegistered = async (provider: providers.Web3Provider, partyId: string) => {
    const signer = provider.getSigner();
    const contract: Contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractAbi,
        signer
    );

    const isRegistered = await contract.isPartyRegistered(partyId);
    return isRegistered;
};
export enum NETWORK {
    MAINNET = 1,
    GOERLI = 5,
    SEPOLIA_ARBITRUM_TESTNET = 421614,
    LOCALHOST = 31337,
  }

 export const CONTRACT_SEPOLIA_ARBITRUM_TESTNET = "0xeBB9868674Daa23A54e5235e950D78a733a00393";

  export const DEFAULT_NETWORK = !!process.env.NEXT_PUBLIC_CHAIN_ID
  ? Number(process.env.NEXT_PUBLIC_CHAIN_ID)
  : NETWORK.MAINNET;

export const DEFAULT_NETWORK_NAME = NETWORK[DEFAULT_NETWORK].toLowerCase();
export const CONNECTOR_KEY = "CONNECTOR";
export const chainIdToContracts = {
  "421614": "0xeBB9868674Daa23A54e5235e950D78a733a00393", // Arbitrum Sepolia
  "84531": "0xeBB9868674Daa23A54e5235e950D78a733a00393", // Base Goerli
  "5001": "0xeBB9868674Daa23A54e5235e950D78a733a00393", // Mantle testnet
  "534351": "0x6b77c6DDE0b1b04b8859071D42621C7690a062E9", // Scroll Sepolia
  "1442": "0x1d0bDCa77D8341De8D4da4926274cb42B21a1586", // Polygon ZkEVM testnet
  "44787": "0xb9652c6565C66C80b5C3385f0243f07805bdB38E", // Celo Alfajores testnet
  "7001": "0xeBB9868674Daa23A54e5235e950D78a733a00393", // Zetachain Athen-3
  "195": "0xeBB9868674Daa23A54e5235e950D78a733a00393", // OKX X1 Testnet
}

export const chainIdToExplorer = {
  "421614": "https://sepolia.arbiscan.io", // Arbitrum Sepolia
  "84531": "https://goerli.basescan.org", // Base Goerli
  "5001": "https://explorer.testnet.mantle.xyz", // Mantle testnet
  "534351": "https://sepolia.scrollscan.dev", // Scroll Sepolia
  "1442": "https://testnet-zkevm.polygonscan.com", // Polygon ZkEVM testnet
  "44787": "https://explorer.bitquery.io/celo_alfajores", // Celo Alfajores testnet
  "7001": "https://explorer.zetachain.com", // Zetachain Athen-3
  "195": "https://www.oklink.com/x1-test", // OKX X1 Testnet
}

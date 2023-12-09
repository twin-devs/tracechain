# Tracechain

Tracechain is a decentralized platform designed to enhance supply chain transparency. It enables manufacturers, suppliers, and consumers to access and verify product information securely. This project aims to revolutionize Solidity compilation with a user-centric approach, providing a feature-rich suite that emphasizes accessibility, security, and performance.

## Features

- **Decentralized Supply Chain Transparency**: Tracechain facilitates a transparent and decentralized supply chain, ensuring the authenticity and integrity of product information.

- **Compatibility with Multiple Blockchain Networks**: The platform interfaces with various blockchain networks, including Mantle, Celo, Zeta, Scroll Sepolia, Arbitrum, Base, polygon zkEVM and OKX Testnet.

- **Lighthouse Storage using IPFS**: Secure and decentralized storage of product-related data is achieved through programmable storage using the Lighthouse Storage SDK with the InterPlanetary File System (IPFS). This ensures an immutable and transparent supply chain history. The data is stored in an encrypted manner, involving the use of an encryption key by the data publisher.

- **Waku for Decentralized Payload Delivery**: Waku is utilized for sending payloads in a decentralized manner, enabling easy decryption. This ensures a seamless and interconnected environment for smart contract development and execution across multiple blockchain networks. 

## Deployment

Here is a table showcasing the deployments of Tracechain on various blockchain networks:

| Blockchain Network         | Contract Address                  | Explorer Link                               |
| --------------------------- | --------------------------------- | --------------------------------------------|
| Mantle                      | `0x1234567890abcdef1234567890abcde` | [Mantle Explorer](link-to-explorer)        |
| Celo                        | `0xabcdef1234567890abcdef123456789` | [Celo Explorer](link-to-explorer)          |
| Zeta                        | `0x7890abcdef1234567890abcdef12345` | [Zeta Explorer](link-to-explorer)          |
| Scroll Sepolia              | `0x88F5804fe2731abe4A94D08136E0445006748BA1` | [Scroll Sepolia Explorer](https://sepolia.scrollscan.dev/address/0x88F5804fe2731abe4A94D08136E0445006748BA1)|
| Arbitrum                    | `0xcdef1234567890abcdef1234567890a` | [Arbitrum Explorer](link-to-explorer)      |
| Base                        | `0x567890abcdef1234567890abcdef12` | [Base Explorer](link-to-explorer)          |
| polygon zkEVM Testnet       | `0xeBB9868674Daa23A54e5235e950D78a733a00393` | [Polygon zkEVM Testnet Explorer](https://testnet-zkevm.polygonscan.com/address/0xeBB9868674Daa23A54e5235e950D78a733a00393)|
| OKX-1Chain       | `0x90abcdef1234567890abcdef123456` | [Polygon zkEVM Testnet Explorer](link-to-explorer)|

**Note**: Replace the placeholder contract addresses and explorer links with the actual deployment details.

## Getting Started

To get started with Tracechain, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/twin-devs/tracechain.git
   ```

2. Install dependencies:

   ```bash
   cd tracechain
   npm install
   ```

3. Configure the blockchain network settings in the configuration file.

4. Deploy the smart contracts:

   ```bash
   truffle migrate --network <network-name>
   ```

5. Explore and integrate Tracechain into your supply chain management system.

## Contributors

1. [Abhishek Kumar](https://github.com/twin-devs/tracechain/commits?author=xenowits)
2. [Dhruv Bodani](https://github.com/dB2510)
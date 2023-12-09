# <img src="logo.png" height="100" width="100" style='vertical-align:middle;'> <div style='vertical-align:middle; display:inline;'>Tracechain</div>


Tracechain is a decentralized platform designed to enhance supply chain transparency. It enables manufacturers, suppliers, and consumers to access and verify product information securely. This project aims to revolutionize Solidity compilation with a user-centric approach, providing a feature-rich suite that emphasizes accessibility, security, and performance.

## Features

- **Decentralized Supply Chain Transparency**: `Tracechain` facilitates a transparent and decentralized supply chain, ensuring the authenticity and integrity of product information.

- **Compatibility with Multiple Blockchain Networks**: The platform interfaces with various blockchain networks, including `Mantle`, `Celo`, `Zeta`, `Scroll Sepolia`, `Arbitrum`, `Base`, `Polygon zkEVM` and `OKX Testnet`.

- **Lighthouse Storage using IPFS**: Secure and decentralized storage of product-related data is achieved through programmable storage using the [Lighthouse Storage SDK](https://www.lighthouse.storage/) with the [InterPlanetary File System (IPFS)](https://ipfs.tech/). This ensures an immutable and transparent supply chain history. The data is stored in an encrypted manner, involving the use of an encryption key by the data publisher.

- **Waku for Decentralized Payload Delivery**: [Waku](https://docs.waku.org/) is utilized for sending payloads in a decentralized manner, enabling easy decryption. This ensures a seamless and interconnected environment for smart contract development and execution across multiple blockchain networks. 

## Deployment

Here is a table showcasing the deployments of `Tracechain` on various blockchain networks:

| Blockchain Network                                                | Contract Address                  | Explorer Link                               |
|-------------------------------------------------------------------| --------------------------------- | --------------------------------------------|
| [Mantle](https://www.mantle.xyz/)                                 | `0x7e64463DebD272F12AD61dc991808aB209841633` | [Mantle Explorer](https://explorer.testnet.mantle.xyz/address/0x7e64463DebD272F12AD61dc991808aB209841633)        |
| [Celo Alfajores](https://docs.celo.org/network/alfajores)         | `0x88F5804fe2731abe4A94D08136E0445006748BA1` | [Celo Explorer](https://explorer.bitquery.io/celo_alfajores/smart_contract/0x88F5804fe2731abe4A94D08136E0445006748BA1)          |
| [Zeta](https://www.zetachain.com/)                                | `0x7e64463DebD272F12AD61dc991808aB209841633` | [Zeta Explorer](https://explorer.zetachain.com/address/0x7e64463DebD272F12AD61dc991808aB209841633)          |
| [Scroll Sepolia](https://scroll.io/)                              | `0x88F5804fe2731abe4A94D08136E0445006748BA1` | [Scroll Sepolia Explorer](https://sepolia.scrollscan.dev/address/0x88F5804fe2731abe4A94D08136E0445006748BA1)|
| [Arbitrum Sepolia](https://arbitrum.io/)                          | `0xeBB9868674Daa23A54e5235e950D78a733a00393` | [Arbitrum Explorer](https://sepolia.arbiscan.io/address/0x7e64463DebD272F12AD61dc991808aB209841633)      |
| [Base](https://base.org/)                                         | `0x7e64463DebD272F12AD61dc991808aB209841633` | [Base Explorer](https://goerli.basescan.org/address/0x7e64463debd272f12ad61dc991808ab209841633)          |
| [Polygon zkEVM Testnet](https://polygon.technology/polygon-zkevm) | `0xeBB9868674Daa23A54e5235e950D78a733a00393` | [Polygon zkEVM Testnet Explorer](https://testnet-zkevm.polygonscan.com/address/0xeBB9868674Daa23A54e5235e950D78a733a00393)|
| [OKX X1 Testnet](https://www.okx.com/x1)                          | `0x7e64463DebD272F12AD61dc991808aB209841633` | [OKX X1 Testnet](https://www.oklink.com/x1-test/address/0x7e64463debd272f12ad61dc991808ab209841633)|


## Getting Started

To get started with Tracechain, follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/twin-devs/tracechain.git
   ```

2. Install dependencies:

   ```bash
   cd tracechain/traceui
   npm install
   ```

3. Run the nextjs app
   ```bash
   npm run dev
   ```

## Project structure

* `contracts`: The smart contracts live inside this folder
* `traceui`: This contains the nextJS UI application

## Contributors

1. [Abhishek Kumar](https://github.com/twin-devs/tracechain/commits?author=xenowits)
2. [Dhruv Bodani](https://github.com/dB2510)
3. [Nishtha Bodani](https://github.com/nb9960)

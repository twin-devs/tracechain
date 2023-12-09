import lighthouse from '@lighthouse-web3/sdk';
import kavach from '@lighthouse-web3/kavach';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { ethers, JsonRpcProvider } from "ethers";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';

dotenv.config();

// Load the ABI and bytecode from the files
const abi = JSON.parse(fs.readFileSync('./build/Tracking.abi', 'utf-8'));
const bytecode = '0x' + fs.readFileSync('./build/Tracking.bin', 'utf-8');

// Address of deployed tracking contract.
const addr = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const track = new ethers.Contract(addr, abi, provider);

// Instantiate private key & wallet
const privateKey = process.env.ETH_WALLET_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Connect to a local Ethereum node or use Infura
const provider = new JsonRpcProvider('http://localhost:8545'); // Replace with your Ethereum node URL

// Step 1: Each party (manufacturer/intermediary) registers itself with the contract.
const registerParty = async (registeredAddress, registrationNo, GSTNumber) => {
    const partyID = uuidv4();
    const tx = await track.registerParty(
        partyID,
        registeredAddress,
        registrationNo,
        GSTNumber
    );

    console.log("Party registered", tx.hash);
}

// Step 2: The manufacturer registers the item on chain.
const registerItemOnchain = async (UPCCode, mfgDate, expDate, mfgAddress) => {
    const itemDetails = {
        upcCode: UPCCode,
        manufacturingDate: mfgDate,
        expDate: expDate,
        mfgAddress: mfgAddress
    };

    // Store metadata of item on lighthouse storage
    const contentID = await lighthouse.uploadText(JSON.stringify(itemDetails), process.env.LIGHTHOUSE_API_KEY);

    const tx = await track.connect(wallet).registerItem(UPCCode, contentID);
    await tx.wait();

    console.log("Item registered on chain", tx.hash);
}

// Step 3: An intermediary attests to the item when it receives it on its end.
const intermediaryAttestation = async (UPCCode) => {
    const tx = await track.connect(wallet).attest(UPCCode);
    await tx.wait();

    console.log("Intermediary attestation completed successfully!!", tx.hash);
}

// Step 4: Trace history of the product.
const traceHistory = async (UPCCode) => {
    try {
        const history = await track.getHistory(UPCCode);
        return history || []; // Return the array of strings, or an empty array if history is falsy
    } catch (error) {
        console.error('Error fetching trace history:', error.message);
        return []; // Return an empty array in case of an error
    }

    let attestations;
    for (let i = 0; i < history.length; i++) {
        let attesterAddr = history[i][0];
        let timestamp = history[i][1];

        // Get details of the attester/party
        const partyDetails = await track.getPartyDetails(attesterAddr);
        console.log("party details", partyDetails);

        const att = {
            partyID: partyDetails[0],
            registeredAddress: partyDetails[1],
            registrationNo: partyDetails[2],
            GSTNumber: partyDetails[3],
            timestamp: timestamp
        }

        attestations.push(att);
    }

    return attestations;
}

// Returns a JWT to be used for encrypted storage for files.
const signAuthMessage = async () => {
    const authMessage = await kavach.getAuthMessage(wallet.address)
    const signedMessage = await signer.signMessage(authMessage.message)
    const { JWT, error } = await kavach.getJWT(wallet.address, signedMessage)
    return (JWT)
}

// Retrieve content for the given content id.
export const retrievePayload = (cid, path) => {
    fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`)
        .then(response => {
            if (response.ok) {
                console.log(response.headers.get("content-type"));
                return response.buffer()
            }
            throw new Error('Network response was not ok.');
        })
        .then(buffer => {
            fs.writeFile(path, buffer, () => {
                console.log(`File saved to ${path}`);
            });
        })
        .catch(error => {
            console.error('Failed to save the file:', error);
        });
};

// Uploads encrypted payload with the given data.
export const uploadEncryptedPayload = async (data) => {
    const signedMessage = await signAuthMessage();
    const response = await lighthouse.textUploadEncrypted(JSON.stringify(data), process.env.LIGHTHOUSE_API_KEY, publicKey, signedMessage);
    return response.data.Hash
}

// Retrieves encrypted payload for the given content id.
export const retrieveEncryptedPayload = async (cid) => {
    const signedMessage = await signAuthMessage();
    try {
        const fileEncryptionKey = await lighthouse.fetchEncryptionKey(
            cid,
            wallet.address,
            signedMessage
        )

        // Decrypt Payload
        const decrypted = await lighthouse.decryptFile(
            cid,
            fileEncryptionKey.data.key
        )

        // Save Payload
        fs.createWriteStream("out.json").write(Buffer.from(decrypted))
    } catch (err) {
        console.log("error retrieving: ", err)
    }
}

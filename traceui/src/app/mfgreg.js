"use client";

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ethers } from "ethers";

const trackingABI = `[{"inputs":[{"internalType":"string","name":"upcCode","type":"string"}],"name":"attest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"upcCode","type":"string"}],"name":"getHistory","outputs":[{"components":[{"internalType":"address","name":"attester","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct Tracking.att[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"upcCode","type":"string"}],"name":"getMetadata","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"partyEthAddress","type":"address"}],"name":"getPartyDetails","outputs":[{"components":[{"internalType":"string","name":"partyID","type":"string"},{"internalType":"string","name":"registeredAddress","type":"string"},{"internalType":"string","name":"registrationNo","type":"string"},{"internalType":"string","name":"GSTNumber","type":"string"}],"internalType":"struct Tracking.partyDetails","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"upcCode","type":"string"},{"internalType":"string","name":"contentID","type":"string"}],"name":"registerItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"partyID","type":"string"},{"internalType":"string","name":"registeredAddress","type":"string"},{"internalType":"string","name":"registrationNo","type":"string"},{"internalType":"string","name":"GSTNumber","type":"string"}],"name":"registerParty","outputs":[],"stateMutability":"nonpayable","type":"function"}]`

// Address of deployed tracking contract.
const chainIdToContracts = {
    "421614": "0x7e64463DebD272F12AD61dc991808aB209841633", // Arbitrum Sepolia
    "84531": "0x7e64463DebD272F12AD61dc991808aB209841633", // Base Sepolia
    "5001": "0x7e64463DebD272F12AD61dc991808aB209841633", // Mantle testnet
    "534351": "0x88F5804fe2731abe4A94D08136E0445006748BA1", // Scroll Sepolia
    "1442": "0xeBB9868674Daa23A54e5235e950D78a733a00393", // Polygon ZkEVM testnet
    "44787": "0x88F5804fe2731abe4A94D08136E0445006748BA1", // Celo Alfajores testnet
    "7001": "0x7e64463DebD272F12AD61dc991808aB209841633", // Zetachain Athen-3
    "195": "0x7e64463DebD272F12AD61dc991808aB209841633", // OKX X1 Testnet
}

const MfgReg = () => {
    const [fieldValues, setFieldValues] = useState({
        regaddr: '',
        regno: '',
        gstno: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFieldValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Step 1: Each party (manufacturer/intermediary) registers itself with the contract.
    const registerParty = async (registeredAddress, registrationNo, GSTNumber) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const chainId = (await provider.getNetwork()).chainId.toString();
        const track = new ethers.Contract(chainIdToContracts[chainId], trackingABI, provider);
        const signer = await provider.getSigner();

        const partyID = uuidv4();
        const tx = await track.connect(signer).registerParty(
            partyID,
            registeredAddress,
            registrationNo,
            GSTNumber
        );
        await tx.wait();

        console.log("Party registered", tx.hash);

        const details = await track.connect(provider).getPartyDetails(signer.address);
        console.log("party details from contract: ", details);
    }

    const handleReg = async () => {
        await registerParty(fieldValues.regaddr, fieldValues.regno, fieldValues.gstno)
        console.log('Registration completed');
    };

    return (
        <div>
            <label>
                Registered address:
                <input type="text" name="regaddr" value={fieldValues.regaddr} onChange={handleInputChange} />
            </label>

            <br />

            <label>
                Registration number:
                <input type="text" name="regno" value={fieldValues.regno} onChange={handleInputChange} />
            </label>

            <br />

            <label>
                GST number:
                <input type="text" name="gstno" value={fieldValues.gstno} onChange={handleInputChange} />
            </label>

            <br />

            <button onClick={handleReg}>Mfg registration</button>
        </div>
    );
}

export default MfgReg;
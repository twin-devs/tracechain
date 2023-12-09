"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {ethers} from "ethers";

const trackingABI = `[{"inputs":[{"internalType":"string","name":"upcCode","type":"string"}],"name":"attest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"upcCode","type":"string"}],"name":"getHistory","outputs":[{"components":[{"internalType":"address","name":"attester","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct Tracking.att[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"upcCode","type":"string"}],"name":"getMetadata","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"partyEthAddress","type":"address"}],"name":"getPartyDetails","outputs":[{"components":[{"internalType":"string","name":"partyID","type":"string"},{"internalType":"string","name":"registeredAddress","type":"string"},{"internalType":"string","name":"registrationNo","type":"string"},{"internalType":"string","name":"GSTNumber","type":"string"}],"internalType":"struct Tracking.partyDetails","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"upcCode","type":"string"},{"internalType":"string","name":"contentID","type":"string"}],"name":"registerItem","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"partyID","type":"string"},{"internalType":"string","name":"registeredAddress","type":"string"},{"internalType":"string","name":"registrationNo","type":"string"},{"internalType":"string","name":"GSTNumber","type":"string"}],"name":"registerParty","outputs":[],"stateMutability":"nonpayable","type":"function"}]`

// Address of deployed tracking contract.
const addr = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const provider = new ethers.BrowserProvider(window.ethereum);
const track = new ethers.Contract(addr, trackingABI, provider);

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
        const partyID = uuidv4();
        const tx = await track.connect(window.ethereum).registerParty(
            partyID,
            registeredAddress,
            registrationNo,
            GSTNumber
        );
        await tx.wait();

        console.log("Party registered", tx.hash);
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
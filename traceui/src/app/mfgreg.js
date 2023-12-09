"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fs } from 'fs';
import {ethers} from "ethers/lib.esm";

// Load the ABI and bytecode from the files
const abi = JSON.parse(fs.readFileSync('./build/Tracking.abi', 'utf-8'));
const bytecode = '0x' + fs.readFileSync('./build/Tracking.bin', 'utf-8');

// Address of deployed tracking contract.
const addr = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
const provider = new ethers.BrowserProvider(window.ethereum);
const track = new ethers.Contract(addr, abi, provider);

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
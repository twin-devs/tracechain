"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const MetaMaskConnect = () => {
    const [address, setAddress] = useState(null);

    const connectToMetaMask = async () => {
        try {
            // Connect to MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const connectedAddress = await signer.getAddress();
            setAddress(connectedAddress);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error.message);
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            // Listen for changes in the MetaMask account
            window.ethereum.on('accountsChanged', (accounts) => {
                setAddress(accounts[0] || null);
            });
        }
    }, []);

    return (
        <div>
            {!address ? (
                <button onClick={connectToMetaMask}>Connect to MetaMask</button>
            ) : (
                <p>Connected Address: {address}</p>
            )}
        </div>
    );
};

export default MetaMaskConnect;

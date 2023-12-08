import lighthouse from '@lighthouse-web3/sdk';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'fs';

dotenv.config();

export const uploadResponse = async (data, upc) => {
    return await lighthouse.uploadText(JSON.stringify(data), process.env.LIGHTHOUSE_API_KEY, upc);
}

export const downloadFile = (cid, path) => {
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

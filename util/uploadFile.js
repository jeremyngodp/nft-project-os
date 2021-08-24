const pinataAPIKey = '03125f21f50614dcc840';
const pinataAPISecret = 'a990e1800a09bf6e91c86f1fb5884452698412d094326e9aea4206f44722618d';
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

/**
 * Usage: run this in the command line:
 * 'node [arg1] [arg2]'
 * arg1: the relative path to this file
 * arg2: the relative path to the file to be uploaded
 * 
 */
const pinFileToIPFS = async (filePath) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append("file", fs.createReadStream(filePath));
    const res = await axios.post(url, data, {
        maxContentLength: "Infinity",
        headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: pinataAPIKey,
            pinata_secret_api_key: pinataAPISecret,
        },
    });
    console.log(res.data);
};

pinFileToIPFS();
const express = require('express');
const router = express.Router();
const { ClientSecretCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

const account = "turnera";
const defaultAzureCredential = new ClientSecretCredential(
    '5633c12f-032f-4713-b960-416376fec2db',
    '281a9491-4f98-4e72-a109-254841fc079e',
    '@2AS.Kd7X//qrFGXPmw3sejUtC1Jai-q'
    );

const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    defaultAzureCredential
);

async function upload_file(data, blobName) {
    const containerName = "files";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    return "https://turnera.blob.core.windows.net/" + containerName + "/" + blobName
}


router.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.file

    upload_file(file.data, file.md5)
        .then(link => {
            res.send(link)
        })
        .catch(err => {
            res.jsonp(err)
        })
});

module.exports = router;

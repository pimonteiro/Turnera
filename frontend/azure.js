const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
var fs = require('fs')

process.env.AZURE_TENANT_ID = '5633c12f-032f-4713-b960-416376fec2db'
process.env.AZURE_CLIENT_ID = '281a9491-4f98-4e72-a109-254841fc079e'
process.env.AZURE_CLIENT_SECRET = '@2AS.Kd7X//qrFGXPmw3sejUtC1Jai-q'

const account = "turnera";
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    defaultAzureCredential
);


async function upload_image(path_to_file) {
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);


    var data = fs.readFileSync(path_to_file)
    var blobName = path_to_file.split('/')
    blobName = blobName[blobName.length -1]
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    return "https://turnera.blob.core.windows.net/" + containerName + "/" + blobName
}

async function upload_file(path_to_file) {
    const containerName = "files";
    const containerClient = blobServiceClient.getContainerClient(containerName);


    var data = fs.readFileSync(path_to_file)
    var blobName = path_to_file.split('/')
    blobName = blobName[blobName.length -1]
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    return "https://turnera.blob.core.windows.net/" + containerName + "/" + blobName
}

upload_image('/home/leonardo/Downloads/test')
    .then((url) => {
        console.log(url)
    })
    .catch((ex) => {
        console.log(ex.message)
    });

//upload_file('/path/to/file')
//    .then((url) => {
//        console.log(url)
//    })
//    .catch((ex) => {
//        console.log(ex.message)
//    });

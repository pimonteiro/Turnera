const { BlobServiceClient } = require('@azure/storage-blob');
var fs = require('fs')

const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=turnera;AccountKey=V+NbtC3tJH8XG0Cv4h+9NAWZIpyz13dKF5rQqE5FvQRjduQ+7SrDbniGYW4P9QlQwjIHRpgM47s99MtdjD5e3w==;EndpointSuffix=core.windows.net"

async function upload(path_to_file) {
    console.log('Azure Blob storage v12 - JavaScript quickstart sample');
    const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerName = "images"
    const containerClient = await blobServiceClient.getContainerClient(containerName);
    var data = fs.readFileSync(path_to_file)
    var blobName = path_to_file.split('/')
    blobName = blobName[blobName.length -1]
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.dir(uploadBlobResponse)
    return "https://turnera.blob.core.windows.net/images/" + blobName
}

upload('/home/leonardo/Pictures/target_salario_prox_contrato.png').then((url) => console.log(url)).catch((ex) => console.log(ex.message));

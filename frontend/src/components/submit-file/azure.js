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


export async function upload_image(data) {
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);


    var blobName = data.split('/')
    blobName = blobName[blobName.length -1]
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    return "https://turnera.blob.core.windows.net/" + containerName + "/" + blobName
}

export async function upload_file(data) {
    const containerName = "files";
    const containerClient = blobServiceClient.getContainerClient(containerName);


    var blobName = path_to_file.split('/')
    blobName = blobName[blobName.length -1]
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    return "https://turnera.blob.core.windows.net/" + containerName + "/" + blobName
}

//upload_image('/home/leonardo/Downloads/test')
 //   .then((url) => {
  //      console.log(url)
   // })
   // .catch((ex) => {
   //     console.log(ex.message)
    //});
//
//upload_file('/path/to/file')
//    .then((url) => {
//        console.log(url)
//    })
//    .catch((ex) => {
//        console.log(ex.message)
//    });

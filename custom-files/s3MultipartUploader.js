// utils/s3MultipartUploader.js

import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const REGION = 'us-west-2'; // your bucket’s region
const BUCKET = 'your-bucket-name'; // your bucket
const IDENTITY = 'us-east-1:xxxx-xxxx-xxxx'; // your Cognito Identity Pool id

// configure credentials via Cognito (or however you do it)
const s3Client = new S3Client({
  region: REGION,
  credentials: async () => {
    // e.g. Amplify.Auth.currentCredentials() or manual Cognito identity call
    return /* a { accessKeyId, secretAccessKey, sessionToken } object */;
  },
});

/**
 * Uploads a local file URI with multipart resilience.
 * @param {string} uri   – local file://… URI
 * @param {function} onProgress – callback(percentage:number)
 * @returns {Promise<string>} – the public URL
 */
export async function multipartUploadToS3(uri, onProgress = () => {}) {
  // 1) fetch the blob
  const fileResp = await fetch(uri);
  const blob = await fileResp.blob();
  const key = uri.split('/').pop(); // or whatever key logic you like

  // 2) create the managed Upload
  const uploader = new Upload({
    client: s3Client,
    params: {
      Bucket: BUCKET,
      Key: key,
      Body: blob,
      ACL: 'public-read', // if you want it public
    },
    partSize: 5 * 1024 * 1024, // 5 MB chunks
    queueSize: 4, // parallel uploads
  });

  // 3) listen for progress events
  uploader.on('httpUploadProgress', progress => {
    if (progress.total) {
      onProgress(Math.round((progress.loaded / progress.total) * 100));
    }
  });

  // 4) wait for completion
  const result = await uploader.done();

  // 5) construct and return the file URL
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
}

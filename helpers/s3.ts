// Import the required AWS SDK clients and commands for Node.js
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
  DeleteBucketCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import fetch, { Response } from 'node-fetch';
// Set the AWS Region.
const REGION = 'us-east-1'; // e.g. "us-east-1"
// Create an Amazon S3 service client object.
export const s3Client = new S3Client({ region: REGION });

// Set parameters
// Create a random names for the Amazon Simple Storage Service (Amazon S3) bucket and key
export const bucketParams = {
  Bucket: 'images-4082161406',
  Key: `test-object-${Math.ceil(Math.random() * 10 ** 10)}`,
  Body: 'BODY',
};

export async function createAmazonS3PresignedURL(): Promise<string> {
  // Create the command.
  const command = new PutObjectCommand(bucketParams);

  // Create the presigned URL.
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  });
  console.log(
    `\nPutting "${bucketParams.Key}" using signedUrl with body "${bucketParams.Body}" in v3`,
  );
  return signedUrl;
}

export async function deleteAmazonS3Object() {
  try {
    // Delete the object.
    console.log(`\nDeleting object "${bucketParams.Key}"} from bucket`);
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketParams.Bucket,
        Key: bucketParams.Key,
      }),
    );
  } catch (err) {
    console.log('Error deleting object', err);
  }
}

export async function deleteAmazonS3Bucket(): Promise<void> {
  try {
    // Delete the Amazon S3 bucket.
    console.log(`\nDeleting bucket ${bucketParams.Bucket}`);
    await s3Client.send(
      new DeleteBucketCommand({ Bucket: bucketParams.Bucket }),
    );
  } catch (err) {
    console.log('Error deleting bucket', err);
  }
}

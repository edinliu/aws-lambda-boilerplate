import {
  Context,
  Callback,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { createAmazonS3Bucket } from './helpers/s3';

export const helloCb = (
  event: APIGatewayProxyEvent,
  context: Context,
  cb: Callback,
): void => cb(null, { message: 'Hello use callback' });

export const helloAsync = async (
  event: APIGatewayProxyEvent,
  // context: Context,
  // cb: Callback,
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  await createAmazonS3Bucket();
  return {
    statusCode: 200,
    body: 'Hello use async',
  };
};

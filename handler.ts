import {
  Context,
  Callback,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { createAmazonS3PresignedURL } from './helpers/s3';

export const helloCb = (
  event: APIGatewayProxyEvent,
  context: Context,
  cb: Callback,
): void => cb(null, { message: 'Hello use callback' });

export const helloAsync = async (): Promise<APIGatewayProxyResult> => {
  const presignedUrl = await createAmazonS3PresignedURL();
  return {
    statusCode: 200,
    body: presignedUrl,
  };
};
// event: APIGatewayProxyEvent,
// context: Context,
// cb: Callback,

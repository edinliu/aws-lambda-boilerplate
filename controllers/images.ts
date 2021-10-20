import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
// import {
// Context,
// Callback,
// APIGatewayProxyEvent,
// APIGatewayProxyResult,
// } from 'aws-lambda';
import { createAmazonS3PresignedURL } from '../helpers/s3';
import { responseSerializer } from '../helpers/middy';
import authenticator, { AuthedEvent } from '../middlewares/authenticator';

export const getPresignedURL = middy(
  async (event: AuthedEvent & { authedUserId: string }) => {
    const { authedUserId } = event;
    return {
      statusCode: 200,
      body: authedUserId,
    };
  },
);

getPresignedURL.use(cors());
getPresignedURL.use(httpEventNormalizer());
getPresignedURL.use(responseSerializer);
getPresignedURL.use(httpJsonBodyParser());
getPresignedURL.use(authenticator());

export const getPresignedURLx = async (): Promise<string> => {
  const presignedUrl = await createAmazonS3PresignedURL();
  return presignedUrl;
};
export const hello = () => 'hello';

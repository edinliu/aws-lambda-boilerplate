import createHttpError from 'http-errors';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { firebaseAdmin } from '../helpers/firebase';

export type AuthedEvent = APIGatewayProxyEvent & {
  loggedInUser: {
    uid: string;
    email: string;
    sub: string;
  };
};

export default () => ({
  before: async (request: { event: AuthedEvent }) => {
    const { event } = request;
    // if (!event.headers?.authorization) {
    //   throw createHttpError(403, 'Missing authorization token');
    // }
    // const [bearerWord, tokenValue] = event.headers.authorization.split(' ');
    // if (bearerWord.toLowerCase() !== 'bearer' || !tokenValue) {
    //   throw createHttpError(403, 'Unauthorized');
    // }
    try {
      const admin = firebaseAdmin();
      const decodedToken = await admin.auth().verifyIdToken('tokenValue');
      const { sub, email, uid } = decodedToken;
      if (!sub || !email) {
        throw createHttpError(403, 'Unauthorized');
      }
      event.loggedInUser.sub = sub;
      event.loggedInUser.email = email;
      event.loggedInUser.uid = uid;
    } catch (err) {
      throw createHttpError(403, `Unauthorized: ${err}`);
    }
  },
});

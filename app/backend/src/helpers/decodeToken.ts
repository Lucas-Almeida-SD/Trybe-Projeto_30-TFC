import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import throwMyErrorObject from './throwMyErrorObject';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (token: string) => {
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    return decode;
  } catch (err) {
    throwMyErrorObject('Token must be a valid token', StatusCodes.UNAUTHORIZED);
  }
};

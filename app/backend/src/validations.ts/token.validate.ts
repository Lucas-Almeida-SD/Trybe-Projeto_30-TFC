import { StatusCodes } from 'http-status-codes';
import throwMyErrorObject from '../helpers/throwMyErrorObject';

const validateTokenExistence = (token: string | undefined) => {
  if (!token) {
    return throwMyErrorObject('Token not found', StatusCodes.UNAUTHORIZED);
  }
};

export default {
  validateTokenExistence,
};

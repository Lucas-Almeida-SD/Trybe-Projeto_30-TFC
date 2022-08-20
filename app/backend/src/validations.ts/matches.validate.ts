import { StatusCodes } from 'http-status-codes';
import throwMyErrorObject from '../helpers/throwMyErrorObject';

const validateTeamsEquality = (homeTeam: number, awayTeam: number) => {
  if (homeTeam === awayTeam) {
    throwMyErrorObject(
      'It is not possible to create a match with two equal teams',
      StatusCodes.UNAUTHORIZED,
    );
  }
};

export default {
  validateTeamsEquality,
};

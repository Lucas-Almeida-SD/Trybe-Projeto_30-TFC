import { StatusCodes } from 'http-status-codes';
import { TeamDTO } from '../interfaces/Team.interface';
import throwMyErrorObject from '../helpers/throwMyErrorObject';

const validateTeamsEquality = (homeTeam: number, awayTeam: number) => {
  if (homeTeam === awayTeam) {
    throwMyErrorObject(
      'It is not possible to create a match with two equal teams',
      StatusCodes.UNAUTHORIZED,
    );
  }
};

const validateTeamsExistence = (
  teams: Array<TeamDTO>,
  homeTeam: number,
  awayTeam: number,
) => {
  const findHomeTeam = teams.find((team) => team.id === homeTeam);
  const findAwayTeam = teams.find((team) => team.id === awayTeam);

  if (!findHomeTeam || !findAwayTeam) {
    throwMyErrorObject('There is no team with such id!', StatusCodes.NOT_FOUND);
  }
};

export default {
  validateTeamsEquality,
  validateTeamsExistence,
};

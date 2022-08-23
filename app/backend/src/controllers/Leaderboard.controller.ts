import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PersistenceLeaderboardService from '../services/PersistenceLeaderboardService';
import PersistenceLeaderboardController from './PersistenceLeaderboardController';

export default class LeaderboardController extends PersistenceLeaderboardController {
  constructor(private service: PersistenceLeaderboardService) {
    super();
  }

  public getAllByHomeTeam = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const leaderboardList = await this.service.getAllByHomeTeam();

      res.status(StatusCodes.OK).json(leaderboardList);
    } catch (err) {
      next(err);
    }
  };

  public getAllByAwayTeam = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const leaderboardList = await this.service.getAllByAwayTeam();

      res.status(StatusCodes.OK).json(leaderboardList);
    } catch (err) {
      next(err);
    }
  };

  public getAllByGeneralTeam = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const leaderboardList = await this.service.getAllByGeneralTeam();

      res.status(StatusCodes.OK).json(leaderboardList);
    } catch (err) {
      next(err);
    }
  };
}

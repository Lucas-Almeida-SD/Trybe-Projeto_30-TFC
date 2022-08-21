import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import PersistenceMatchController from './PersistenceMatchController';
import PersistenceMatchService from '../services/PersistenceMatchService';
import { MatchTeamGoalsNumber } from '../interfaces/Match.interface';

export default class MatchController extends PersistenceMatchController {
  constructor(private service: PersistenceMatchService) {
    super();
  }

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { inProgress } = req.query;

      if (inProgress) return next();

      const matches = await this.service.getAll();

      res.status(StatusCodes.OK).json(matches);
    } catch (err) {
      next(err);
    }
  };

  public getAllByInProgress = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { inProgress } = req.query;
      const newInProgress = (inProgress === 'true');

      const matches = await this.service.getAllByInProgress(newInProgress);

      res.status(StatusCodes.OK).json(matches);
    } catch (err) {
      next(err);
    }
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const match = req.body;

      const createdMatch = await this.service.create(match);

      res.status(StatusCodes.CREATED).json(createdMatch);
    } catch (err) {
      next(err);
    }
  };

  public editInProgressToFalse = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      await this.service.editInProgressToFalse(Number(id));

      res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  };

  public editGoalsNumber = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const teamGoals = req.body as MatchTeamGoalsNumber;

      await this.service.editGoalsNumber(Number(id), teamGoals);

      res.status(StatusCodes.OK).json('Number of goals edited!');
    } catch (err) {
      next(err);
    }
  };
}

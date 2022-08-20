import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import PersistenceMatchController from './PersistenceMatchController';
import PersistenceMatchService from '../services/PersistenceMatchService';

export default class MatchController extends PersistenceMatchController {
  constructor(private service: PersistenceMatchService) {
    super();
  }

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { inProgress } = req.query;

    if (inProgress !== undefined) return next();

    const matches = await this.service.getAll();

    res.status(StatusCodes.OK).json(matches);
  };

  public getAllByInProgress = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const { inProgress } = req.query;
    const newInProgress = (inProgress === 'true');

    const matches = await this.service.getAllByInProgress(newInProgress);

    res.status(StatusCodes.OK).json(matches);
  };

  public create = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const match = req.body;

    const createdMatch = await this.service.create(match);

    res.status(StatusCodes.CREATED).json(createdMatch);
  };
}

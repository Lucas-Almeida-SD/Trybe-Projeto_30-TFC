import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PersistenceTeamService from '../services/PersistenceTeamService';
import PersistenceTeamController from './PersistenceTeamController';

export default class TeamController extends PersistenceTeamController {
  constructor(private service: PersistenceTeamService) {
    super();
  }

  public getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const teams = await this.service.getAll();

      res.status(StatusCodes.OK).json(teams);
    } catch (err) {
      next(err);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id as string;

      const team = await this.service.getById(Number(id));

      res.status(StatusCodes.OK).json(team);
    } catch (err) {
      next(err);
    }
  };
}

import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import PersistenceMatchController from './PersistenceMatchController';
import PersistenceMatchService from '../services/PersistenceMatchService';

export default class MatchController extends PersistenceMatchController {
  constructor(private service: PersistenceMatchService) {
    super();
  }

  public getAll = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    const matches = await this.service.getAll();

    res.status(StatusCodes.OK).json(matches);
  };
}

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import PersistenceUserService from '../services/PersistenceUserService';
import PersistenceUserController from './PersistenceUserController';

export default class UserController extends PersistenceUserController {
  constructor(private service: PersistenceUserService) {
    super();
  }

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const login = req.body;

    try {
      const token = await this.service.login(login);

      res.status(StatusCodes.OK).json({ token });
    } catch (err) {
      next(err);
    }
  };
}

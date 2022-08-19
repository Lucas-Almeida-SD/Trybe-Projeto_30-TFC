import { NextFunction, Request, Response } from 'express';

export default abstract class PersistenceTeamController {
  abstract getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  abstract getById(req: Request, res: Response, next: NextFunction): Promise<void>;
}

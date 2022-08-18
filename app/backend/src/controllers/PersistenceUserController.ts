import { NextFunction, Request, Response } from 'express';

export default abstract class PersistenceUserController {
  abstract login(req: Request, res: Response, next: NextFunction): void;
}

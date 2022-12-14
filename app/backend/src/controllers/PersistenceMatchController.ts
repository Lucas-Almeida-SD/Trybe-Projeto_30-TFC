import { NextFunction, Request, Response } from 'express';

export default abstract class PersistenceMatchController {
  abstract getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  abstract getAllByInProgress(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  abstract create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  abstract editInProgressToFalse(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  abstract editGoalsNumber(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}

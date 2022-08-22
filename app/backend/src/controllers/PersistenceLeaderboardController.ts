import { NextFunction, Request, Response } from 'express';

export default abstract class PersistenceLeaderboardController {
  abstract getAllByHomeTeam(req: Request, res: Response, next: NextFunction): Promise<void>;
  abstract getAllByAwayTeam(req: Request, res: Response, next: NextFunction): Promise<void>;
}

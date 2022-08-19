import { Request, Response } from 'express';

export default abstract class PersistenceMatchController {
  abstract getAll(
    req: Request,
    res: Response,
  ): Promise<void>;
}

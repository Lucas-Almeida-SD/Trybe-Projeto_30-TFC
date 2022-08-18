import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import decodeToken from '../helpers/decodeToken';
import { User } from '../interfaces/User.interface';
import tokenValidate from '../validations.ts/token.validate';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  tokenValidate.validateTokenExistence(token);

  const decode = decodeToken(token as string) as User;

  if (req.route.path === '/validate') {
    return res.status(StatusCodes.OK).json({ role: decode.role });
  }

  req.user = decode;

  next();
};

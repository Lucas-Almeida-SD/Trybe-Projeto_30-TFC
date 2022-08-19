import { Request, Response, NextFunction } from 'express';

export default (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { name, message } = err;

  if (name === 'errorObject') {
    const { code, message: myMessage } = JSON.parse(message);

    res.status(code).json({ message: myMessage });

    return;
  }
  res.status(500).json({ message });
};

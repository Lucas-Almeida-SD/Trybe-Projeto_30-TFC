type User = {
  id: number;
  username: string;
  role: string;
  email: string;
};

declare namespace Express {
  interface Request {
    user?: User;
  }
}

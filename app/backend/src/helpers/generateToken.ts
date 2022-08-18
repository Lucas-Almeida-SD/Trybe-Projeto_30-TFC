import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserDTO } from '../interfaces/User.interface';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export default (user: UserDTO): string => {
  const { id, username, role, email } = user;
  const data = { id, username, role, email };

  const jwtConfig: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(data, JWT_SECRET, jwtConfig);
  return token;
};

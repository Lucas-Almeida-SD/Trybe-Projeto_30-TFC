import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';
import * as bcrypt from 'bcryptjs';
import throwMyErrorObject from '../helpers/throwMyErrorObject';
import { ILogin } from '../interfaces/Login.interface';

const validateLoginFields = (login: ILogin) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(login);

  if (error) {
    throwMyErrorObject('All fields must be filled', StatusCodes.BAD_REQUEST);
  }
};

const validateUserExistence = (user: object | null) => {
  if (!user) {
    return throwMyErrorObject(
      'Incorrect email or password',
      StatusCodes.UNAUTHORIZED,
    );
  }
};

const checkPassword = (password: string, hash: string) => {
  const isValidPassword = bcrypt.compareSync(password, hash);
  if (!isValidPassword) {
    throwMyErrorObject('Incorrect email or password', StatusCodes.UNAUTHORIZED);
  }
};

export default {
  validateLoginFields,
  validateUserExistence,
  checkPassword,
};

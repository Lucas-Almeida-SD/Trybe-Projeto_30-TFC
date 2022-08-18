import generateToken from '../helpers/generateToken';
import { ILogin } from '../interfaces/Login.interface';
import PersistenceUserService from './PersistenceUserService';
import PersistenceUserModel from '../database/models/PersistenceUserModel';
import loginValidate from '../validations.ts/login.validate';
import { UserDTO } from '../interfaces/User.interface';

export default class UserService extends PersistenceUserService {
  constructor(private model: PersistenceUserModel) {
    super();
  }

  public async login(login: ILogin): Promise<string> {
    loginValidate.validateLoginFields(login);

    const user = await this.model.login(login.email);

    loginValidate.validateUserExistence(user);

    const token = generateToken(user as UserDTO);

    return token;
  }
}

import generateToken from '../helpers/generateToken';
import { ILogin } from '../interfaces/Login.interface';
import PersistenceUserService from './PersistenceUserService';
import PersistenceUserModel from '../database/models/PersistenceUserModel';
import loginValidate from '../validations.ts/login.validate';

export default class UserService extends PersistenceUserService {
  constructor(private model: PersistenceUserModel) {
    super();
  }

  public async login(login: ILogin): Promise<string> {
    loginValidate.validateLoginFields(login);

    const { email } = login;

    const user = await this.model.login(email);

    const token = generateToken(user);

    return token;
  }
}

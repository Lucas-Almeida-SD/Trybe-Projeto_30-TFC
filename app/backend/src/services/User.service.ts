import generateToken from '../helpers/generateToken';
import { ILogin } from '../interfaces/Login.interface';
import PersistenceUserService from './PersistenceUserService';
import PersistenceUserModel from '../database/models/PersistenceUserModel';

export default class UserService extends PersistenceUserService {
  constructor(private model: PersistenceUserModel) {
    super();
  }

  public async login(login: ILogin): Promise<string> {
    const { email } = login;

    const user = await this.model.login(email);

    const token = generateToken(user);

    return token;
  }
}

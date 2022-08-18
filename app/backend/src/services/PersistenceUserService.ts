import { ILogin } from '../interfaces/Login.interface';

export default abstract class PersistenceUserService {
  abstract login(login: ILogin): Promise<string>;
}

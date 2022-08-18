import { UserDTO } from '../../interfaces/User.interface';

export default abstract class PersistenceUserModel {
  abstract login(email: string): Promise<UserDTO | null>;
}

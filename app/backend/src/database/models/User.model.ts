import UserRepository from './repository/User.repository';
import { UserDTO } from '../../interfaces/User.interface';
import PersistenceUserModel from './PersistenceUserModel';

export default abstract class UserModel extends PersistenceUserModel {
  public static async login(email: string): Promise<UserDTO> {
    const user = await UserRepository.findOne({ where: { email } });

    const newUser = user as UserDTO;

    return newUser;
  }
}

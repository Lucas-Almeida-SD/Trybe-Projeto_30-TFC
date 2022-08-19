import { TeamDTO } from '../../interfaces/Team.interface';
import TeamRepository from './repository/Team.repository';

export default abstract class TeamModel {
  public static async getAll(): Promise<Array<TeamDTO>> {
    const teams = await TeamRepository.findAll();

    return teams;
  }

  public static async getById(id: number): Promise<TeamDTO> {
    const team = await TeamRepository.findByPk(id);

    return team as TeamDTO;
  }
}

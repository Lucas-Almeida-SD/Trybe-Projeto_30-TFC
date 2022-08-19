import { TeamDTO } from '../../interfaces/Team.interface';
import PersistenceTeamModel from './PersistenceTeamModel';
import TeamRepository from './repository/Team.repository';

export default abstract class TeamModel extends PersistenceTeamModel {
  public static async getAll(): Promise<Array<TeamDTO>> {
    const teams = await TeamRepository.findAll();

    return teams;
  }
}

import PersistenceTeamModel from '../database/models/PersistenceTeamModel';
import { TeamDTO } from '../interfaces/Team.interface';
import PersistenceTeamService from './PersistenceTeamService';

export default class TeamService extends PersistenceTeamService {
  constructor(private model: PersistenceTeamModel) {
    super();
  }

  public async getAll(): Promise<Array<TeamDTO>> {
    const teams = await this.model.getAll();

    return teams;
  }

  public async getById(id: number): Promise<TeamDTO> {
    const team = await this.model.getById(id);

    return team;
  }
}

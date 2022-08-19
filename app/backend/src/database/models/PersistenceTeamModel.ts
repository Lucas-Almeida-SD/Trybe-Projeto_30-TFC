import { TeamDTO } from '../../interfaces/Team.interface';

export default abstract class PersistenceTeamModel {
  abstract getAll(): Promise<Array<TeamDTO>>;
  abstract getById(id: number): Promise<TeamDTO>;
}

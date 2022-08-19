import { TeamDTO } from '../interfaces/Team.interface';

export default abstract class PersistenceTeamService {
  abstract getAll(): Promise<Array<TeamDTO>>;
  abstract getById(id: number): Promise<TeamDTO>;
}

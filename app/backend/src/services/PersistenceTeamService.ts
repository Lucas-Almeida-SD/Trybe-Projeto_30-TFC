import { TeamDTO } from '../interfaces/Team.interface';

export default abstract class PersistenceTeamService {
  abstract getAll(): Promise<Array<TeamDTO>>;
}

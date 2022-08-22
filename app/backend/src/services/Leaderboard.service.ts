import CalculateLeaderboards from '../helpers/CalculateScore';
import PersistenceLeaderboardModel from '../database/models/PersistenceLeaderboardModels';
import { LeaderboardDTO } from '../interfaces/Leaderboard.interface';
import PersistenceLeaderboardService from './PersistenceLeaderboardService';

export default class LeaderboardService extends PersistenceLeaderboardService {
  constructor(private model: PersistenceLeaderboardModel) {
    super();
  }

  public async getAllByHomeTeam(): Promise<Array<LeaderboardDTO>> {
    const matches = await this.model.getAllByHomeTeam();

    const leaderboard = CalculateLeaderboards.leaderboardList('teamHome', matches);

    return leaderboard;
  }
}

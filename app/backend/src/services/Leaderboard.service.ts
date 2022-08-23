import PersistenceLeaderboardModel from '../database/models/PersistenceLeaderboardModels';
import { LeaderboardDTO } from '../interfaces/Leaderboard.interface';
import PersistenceLeaderboardService from './PersistenceLeaderboardService';
import GenerateLeaderboardList from '../helpers/GenerateLeaderboardList';

export default class LeaderboardService extends PersistenceLeaderboardService {
  constructor(private model: PersistenceLeaderboardModel) {
    super();
  }

  public async getAllByHomeTeam(): Promise<Array<LeaderboardDTO>> {
    const matches = await this.model.getAllMatches();

    const leaderboard = GenerateLeaderboardList.leaderboardList('Home', matches);

    return leaderboard;
  }

  public async getAllByAwayTeam(): Promise<Array<LeaderboardDTO>> {
    const matches = await this.model.getAllMatches();

    const leaderboard = GenerateLeaderboardList.leaderboardList('Away', matches);

    return leaderboard;
  }

  public async getAllByGeneralTeam(): Promise<Array<LeaderboardDTO>> {
    const matches = await this.model.getAllMatches();

    const leaderboard = GenerateLeaderboardList.leaderboardList(null, matches);

    return leaderboard;
  }
}

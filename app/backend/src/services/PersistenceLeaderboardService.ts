import { LeaderboardDTO } from '../interfaces/Leaderboard.interface';

export default abstract class PersistenceLeaderboardService {
  abstract getAllByHomeTeam(): Promise<Array<LeaderboardDTO>>;
  abstract getAllByAwayTeam(): Promise<Array<LeaderboardDTO>>;
}

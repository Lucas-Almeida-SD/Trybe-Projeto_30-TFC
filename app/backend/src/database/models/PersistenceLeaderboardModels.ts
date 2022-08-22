import MatchDTO from '../../interfaces/Match.interface';

export default abstract class PersistenceLeaderboardModel {
  abstract getAllByHomeTeam(): Promise<Array<MatchDTO>>;
}

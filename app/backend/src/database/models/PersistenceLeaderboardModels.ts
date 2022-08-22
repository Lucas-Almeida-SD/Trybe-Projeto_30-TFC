import MatchDTO from '../../interfaces/Match.interface';

export default abstract class PersistenceLeaderboardModel {
  abstract getAllMatches(): Promise<Array<MatchDTO>>;
}

import MatchDTO from '../interfaces/Match.interface';

export default abstract class PersistenceMatchService {
  abstract getAll(): Promise<Array<MatchDTO>>;
  abstract getAllByInProgress(inProgress: boolean): Promise<Array<MatchDTO>>;
}

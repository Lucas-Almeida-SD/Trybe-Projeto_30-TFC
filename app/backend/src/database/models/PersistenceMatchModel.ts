import MatchDTO from '../../interfaces/Match.interface';

export default abstract class PersistenceMatchModel {
  abstract getAll(): Promise<Array<MatchDTO>>;
}

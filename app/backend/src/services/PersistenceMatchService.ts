import MatchDTO, { MatchCreateRequest, MatchCreateResponse } from '../interfaces/Match.interface';

export default abstract class PersistenceMatchService {
  abstract getAll(): Promise<Array<MatchDTO>>;
  abstract getAllByInProgress(inProgress: boolean): Promise<Array<MatchDTO>>;
  abstract create(match: MatchCreateRequest): Promise<MatchCreateResponse>;
  abstract editInProgressToFalse(id: number): Promise<void>;
}

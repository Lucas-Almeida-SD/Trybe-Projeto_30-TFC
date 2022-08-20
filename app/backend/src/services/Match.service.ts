import MatchDTO, { MatchCreateRequest, MatchCreateResponse } from '../interfaces/Match.interface';
import PersistenceMatchModel from '../database/models/PersistenceMatchModel';
import PersistenceMatchService from './PersistenceMatchService';

export default class MatchService extends PersistenceMatchService {
  constructor(private model: PersistenceMatchModel) {
    super();
  }

  public async getAll(): Promise<Array<MatchDTO>> {
    const matches = await this.model.getAll();

    return matches;
  }

  public async getAllByInProgress(inProgress: boolean): Promise<Array<MatchDTO>> {
    const matches = await this.model.getAllByInProgress(inProgress);

    return matches;
  }

  public async create(match: MatchCreateRequest): Promise<MatchCreateResponse> {
    const createdMatch = await this.model.create(match);

    return createdMatch;
  }

  public async editInProgressToFalse(id: number): Promise<void> {
    await this.model.editInProgressToFalse(id);
  }
}

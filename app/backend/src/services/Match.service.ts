import MatchDTO from '../interfaces/Match.interface';
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
}

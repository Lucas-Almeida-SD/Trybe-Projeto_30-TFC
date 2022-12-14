import MatchDTO, {
  MatchCreateRequest,
  MatchCreateResponse,
  MatchTeamGoalsNumber,
} from '../interfaces/Match.interface';
import PersistenceMatchModel from '../database/models/PersistenceMatchModel';
import PersistenceMatchService from './PersistenceMatchService';
import matchesValidate from '../validations.ts/matches.validate';
import PersistenceTeamModel from '../database/models/PersistenceTeamModel';

export default class MatchService extends PersistenceMatchService {
  constructor(
    private model: PersistenceMatchModel,
    private teamModel: PersistenceTeamModel,
  ) {
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
    matchesValidate.validateTeamsEquality(match.homeTeam, match.awayTeam);

    const teams = await this.teamModel.getAll();

    matchesValidate.validateTeamsExistence(teams, match.homeTeam, match.awayTeam);

    const createdMatch = await this.model.create(match);

    return createdMatch;
  }

  public async editInProgressToFalse(id: number): Promise<void> {
    await this.model.editInProgressToFalse(id);
  }

  public async editGoalsNumber(
    id: number,
    teamGoals: MatchTeamGoalsNumber,
  ): Promise<void> {
    await this.model.editGoalsNumber(id, teamGoals);
  }
}

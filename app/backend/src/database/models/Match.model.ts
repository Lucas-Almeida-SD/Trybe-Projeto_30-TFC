import MatchDTO, {
  MatchCreateRequest,
  MatchCreateResponse,
  MatchTeamGoalsNumber,
} from '../../interfaces/Match.interface';
import PersistenceMatchModel from './PersistenceMatchModel';
import MatchRepository from './repository/Match.repository';
import TeamRepository from './repository/Team.repository';

export default abstract class MatchModel extends PersistenceMatchModel {
  public static async getAll(): Promise<Array<MatchDTO>> {
    const matches = await MatchRepository.findAll({
      include: [
        { model: TeamRepository, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamRepository, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  public static async getAllByInProgress(inProgress: boolean): Promise<Array<MatchDTO>> {
    const matches = await MatchRepository.findAll({
      where: { inProgress },
      include: [
        { model: TeamRepository, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamRepository, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  public static async create(
    match: MatchCreateRequest,
  ): Promise<MatchCreateResponse> {
    const createdMatch = await MatchRepository.create({
      ...match,
      inProgress: true,
    });

    return createdMatch;
  }

  public static async editInProgressToFalse(id: number): Promise<void> {
    await MatchRepository.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public static async editGoalsNumber(
    id: number,
    teamGoals: MatchTeamGoalsNumber,
  ): Promise<void> {
    await MatchRepository.update(
      {
        homeTeamGoals: teamGoals.homeTeamGoals,
        awayTeamGoals: teamGoals.awayTeamGoals,
      },
      { where: { id } },
    );
  }
}

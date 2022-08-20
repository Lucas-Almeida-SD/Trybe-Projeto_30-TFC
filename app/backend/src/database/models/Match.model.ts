import MatchDTO from '../../interfaces/Match.interface';
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
}

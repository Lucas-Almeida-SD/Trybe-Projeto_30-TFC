import MatchDTO from '../../interfaces/Match.interface';
import PersistenceLeaderboardModel from './PersistenceLeaderboardModels';
import MatchRepository from './repository/Match.repository';
import TeamRepository from './repository/Team.repository';

export default abstract class LeaderboardModel extends PersistenceLeaderboardModel {
  public static async getAllByHomeTeam(): Promise<Array<MatchDTO>> {
    const matches = await MatchRepository.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamRepository, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamRepository, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }
}

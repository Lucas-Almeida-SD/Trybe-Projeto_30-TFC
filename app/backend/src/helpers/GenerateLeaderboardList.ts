import { LeaderboardDTO } from '../interfaces/Leaderboard.interface';
import MatchDTO from '../interfaces/Match.interface';
import CalculateLeaderboard from './CalculateLeaderboard';

type Local = 'Home' | 'Away';

export default abstract class GenerateLeaderboardList extends CalculateLeaderboard {
  private static totalPointsCondition(
    nextLeaderboard: LeaderboardDTO,
    prevLeaderboard: LeaderboardDTO,
  ): boolean {
    return nextLeaderboard.totalPoints > prevLeaderboard.totalPoints;
  }

  private static victoriesCondition(
    nextLeaderboard: LeaderboardDTO,
    prevLeaderboard: LeaderboardDTO,
  ): boolean {
    return nextLeaderboard.totalPoints === prevLeaderboard.totalPoints
      && nextLeaderboard.totalVictories > prevLeaderboard.totalVictories;
  }

  private static goalsBalanceCondition(
    nextLeaderboard: LeaderboardDTO,
    prevLeaderboard: LeaderboardDTO,
  ): boolean {
    return (nextLeaderboard.totalPoints === prevLeaderboard.totalPoints
      && nextLeaderboard.totalVictories === prevLeaderboard.totalVictories
        && nextLeaderboard.goalsBalance > prevLeaderboard.goalsBalance
    );
  }

  private static goalsFavorCondition(
    nextLeaderboard: LeaderboardDTO,
    prevLeaderboard: LeaderboardDTO,
  ): boolean {
    return (nextLeaderboard.totalPoints === prevLeaderboard.totalPoints
        && nextLeaderboard.totalVictories === prevLeaderboard.totalVictories
        && nextLeaderboard.goalsBalance === prevLeaderboard.goalsBalance
        && nextLeaderboard.goalsFavor > prevLeaderboard.goalsFavor
    );
  }

  private static goalsOwnCondition(
    nextLeaderboard: LeaderboardDTO,
    prevLeaderboard: LeaderboardDTO,
  ): boolean {
    return (nextLeaderboard.totalPoints === prevLeaderboard.totalPoints
        && nextLeaderboard.totalVictories === prevLeaderboard.totalVictories
        && nextLeaderboard.goalsBalance === prevLeaderboard.goalsBalance
        && nextLeaderboard.goalsFavor === prevLeaderboard.goalsFavor
        && nextLeaderboard.goalsOwn < prevLeaderboard.goalsOwn
    );
  }

  private static sortLeaderboardList(
    leaderboardList: Array<LeaderboardDTO>,
  ): Array<LeaderboardDTO> {
    return leaderboardList.sort((next, prev) => {
      const totalPointsCondition = GenerateLeaderboardList.totalPointsCondition(next, prev);
      const victoriesCondition = GenerateLeaderboardList.victoriesCondition(next, prev);
      const goalsBalanceCondition = GenerateLeaderboardList.goalsBalanceCondition(next, prev);
      const goalsFavorCondition = GenerateLeaderboardList.goalsFavorCondition(next, prev);
      const goalsOwnCondition = GenerateLeaderboardList.goalsOwnCondition(next, prev);
      if (
        totalPointsCondition
        || victoriesCondition
        || goalsBalanceCondition
        || goalsFavorCondition
        || goalsOwnCondition) {
        return -1;
      }
      return 0;
    });
  }

  public static leaderboardList(local: Local | null, matches: Array<MatchDTO>)
    : Array<LeaderboardDTO> {
    const teamList = (local)
      ? GenerateLeaderboardList.localTeamList(local, matches)
      : GenerateLeaderboardList.generalTeamList(matches);
    const leaderboardList = teamList.map((teamName) => ({
      name: teamName,
      totalPoints: GenerateLeaderboardList.totalPoints(teamName, local, matches),
      totalGames: GenerateLeaderboardList.totalGames(teamName, local, matches),
      totalVictories: GenerateLeaderboardList.totalVictories(teamName, local, matches),
      totalDraws: GenerateLeaderboardList.totalDraws(teamName, local, matches),
      totalLosses: GenerateLeaderboardList.totalLosses(teamName, local, matches),
      goalsFavor: GenerateLeaderboardList.goalsFavor(teamName, local, matches),
      goalsOwn: GenerateLeaderboardList.goalsOwn(teamName, local, matches),
      goalsBalance: GenerateLeaderboardList.goalsBalance(teamName, local, matches),
      efficiency: GenerateLeaderboardList.efficiency(teamName, local, matches),
    }));
    return GenerateLeaderboardList.sortLeaderboardList(leaderboardList);
  }
}

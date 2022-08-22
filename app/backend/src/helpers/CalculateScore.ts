import { LeaderboardDTO } from '../interfaces/Leaderboard.interface';
import MatchDTO from '../interfaces/Match.interface';

type Local = 'teamHome' | 'teamAway';
type localGoals = 'homeTeamGoals' | 'awayTeamGoals';

export default abstract class CalculateLeaderboards {
  private static teamList(local: Local, matches: Array<MatchDTO>): Array<string> {
    const teamList: Array<string> = [];
    matches.forEach((match) => {
      if (!teamList.includes(match[local].teamName)) {
        teamList.push(match[local].teamName);
      }
    });
    return teamList;
  }

  private static teamMatchList(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): Array<MatchDTO> {
    const homeTeamMatchList: Array<MatchDTO> = matches
      .filter((match) => match[local].teamName === teamName);
    return homeTeamMatchList;
  }

  private static localGoals(local: Local): localGoals {
    return (local === 'teamHome') ? 'homeTeamGoals' : 'awayTeamGoals';
  }

  private static otherLocalGoals(local: Local): localGoals {
    return (local === 'teamHome') ? 'awayTeamGoals' : 'homeTeamGoals';
  }

  private static totalPoints(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = CalculateLeaderboards.teamMatchList(teamName, local, matches);
    const localGoals = CalculateLeaderboards.localGoals(local);
    const otherLocalGoals = CalculateLeaderboards.otherLocalGoals(local);
    const totalPoints = teamMatchList.reduce((acc, match) => {
      if (match[localGoals] > match[otherLocalGoals]) return acc + 3;
      if (match[localGoals] < match[otherLocalGoals]) return acc;
      return acc + 1;
    }, 0);
    return totalPoints;
  }

  private static totalGames(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = CalculateLeaderboards.teamMatchList(teamName, local, matches);
    return teamMatchList.length;
  }

  private static totalVictories(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = CalculateLeaderboards.teamMatchList(teamName, local, matches);
    const localGoals = CalculateLeaderboards.localGoals(local);
    const otherLocalGoals = CalculateLeaderboards.otherLocalGoals(local);
    const totalVictories = teamMatchList.reduce((acc, match) => (
      (match[localGoals] > match[otherLocalGoals]) ? acc + 1 : acc
    ), 0);
    return totalVictories;
  }

  private static totalDraws(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = CalculateLeaderboards.teamMatchList(teamName, local, matches);
    const localGoals = CalculateLeaderboards.localGoals(local);
    const otherLocalGoals = CalculateLeaderboards.otherLocalGoals(local);
    const totalDraws = teamMatchList.reduce((acc, match) => (
      (match[localGoals] === match[otherLocalGoals]) ? acc + 1 : acc
    ), 0);
    return totalDraws;
  }

  private static totalLosses(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = CalculateLeaderboards.teamMatchList(teamName, local, matches);
    const localGoals = CalculateLeaderboards.localGoals(local);
    const otherLocalGoals = CalculateLeaderboards.otherLocalGoals(local);
    const totalLosses = teamMatchList.reduce((acc, match) => (
      (match[localGoals] < match[otherLocalGoals]) ? acc + 1 : acc
    ), 0);
    return totalLosses;
  }

  private static goalsFavor(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = CalculateLeaderboards.teamMatchList(teamName, local, matches);
    const localGoals = CalculateLeaderboards.localGoals(local);
    const totalLosses = teamMatchList.reduce((acc, match) => (
      acc + match[localGoals]
    ), 0);
    return totalLosses;
  }

  private static goalsOwn(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = CalculateLeaderboards.teamMatchList(teamName, local, matches);
    const otherLocalGoals = CalculateLeaderboards.otherLocalGoals(local);
    const goalsOwn = teamMatchList.reduce((acc, match) => (
      acc + match[otherLocalGoals]
    ), 0);
    return goalsOwn;
  }

  private static goalsBalance(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = CalculateLeaderboards.teamMatchList(teamName, local, matches);
    const localGoals = CalculateLeaderboards.localGoals(local);
    const otherLocalGoals = CalculateLeaderboards.otherLocalGoals(local);
    const goalsBalance = teamMatchList.reduce((acc, match) => (
      acc + match[localGoals] - match[otherLocalGoals]
    ), 0);
    return goalsBalance;
  }

  private static efficiency(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): string {
    const totalPoints = CalculateLeaderboards.totalPoints(teamName, local, matches);
    const totalGames = CalculateLeaderboards.totalGames(teamName, local, matches);
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return efficiency;
  }

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
      const totalPointsCondition = CalculateLeaderboards.totalPointsCondition(next, prev);
      const victoriesCondition = CalculateLeaderboards.victoriesCondition(next, prev);
      const goalsBalanceCondition = CalculateLeaderboards.goalsBalanceCondition(next, prev);
      const goalsFavorCondition = CalculateLeaderboards.goalsFavorCondition(next, prev);
      const goalsOwnCondition = CalculateLeaderboards.goalsOwnCondition(next, prev);
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

  public static leaderboardList(
    local: Local,
    matches: Array<MatchDTO>,
  ): Array<LeaderboardDTO> {
    const teamList = CalculateLeaderboards.teamList(local, matches);
    const leaderboardList = teamList.map((teamName) => ({
      name: teamName,
      totalPoints: CalculateLeaderboards.totalPoints(teamName, local, matches),
      totalGames: CalculateLeaderboards.totalGames(teamName, local, matches),
      totalVictories: CalculateLeaderboards.totalVictories(teamName, local, matches),
      totalDraws: CalculateLeaderboards.totalDraws(teamName, local, matches),
      totalLosses: CalculateLeaderboards.totalLosses(teamName, local, matches),
      goalsFavor: CalculateLeaderboards.goalsFavor(teamName, local, matches),
      goalsOwn: CalculateLeaderboards.goalsOwn(teamName, local, matches),
      goalsBalance: CalculateLeaderboards.goalsBalance(teamName, local, matches),
      efficiency: CalculateLeaderboards.efficiency(teamName, local, matches),
    }));
    return CalculateLeaderboards.sortLeaderboardList(leaderboardList);
  }
}

import LeaderboardMatchDTO from '../interfaces/Leaderboard.interface';
import MatchDTO from '../interfaces/Match.interface';

type Local = 'Home' | 'Away';

export default abstract class CalculateLeaderboard {
  public static localTeamList(local: Local, matches: Array<MatchDTO>): Array<string> {
    const teamList: Array<string> = [];
    matches.forEach((match) => {
      if (!teamList.includes(match[`team${local}`].teamName)) {
        teamList.push(match[`team${local}`].teamName);
      }
    });
    return teamList;
  }

  public static generalTeamList(matches: Array<MatchDTO>): Array<string> {
    const teamList: Array<string> = [];
    matches.forEach((match) => {
      if (!teamList.includes(match.teamHome.teamName)) {
        teamList.push(match.teamHome.teamName);
      }
    });
    matches.forEach((match) => {
      if (!teamList.includes(match.teamAway.teamName)) {
        teamList.push(match.teamHome.teamName);
      }
    });
    return teamList;
  }

  public static localTeamMatchList(
    teamName: string,
    local: Local,
    matches: Array<MatchDTO>,
  ): Array<LeaderboardMatchDTO> {
    const teamMatchList: Array<MatchDTO> = matches
      .filter((match) => match[`team${local}`].teamName === teamName);
    return teamMatchList.map((match) => ({
      teamInFocusGoals: (local === 'Home') ? match.homeTeamGoals : match.awayTeamGoals,
      teamNotInFocusGoals: (local === 'Home') ? match.awayTeamGoals : match.homeTeamGoals,
      teamInFocus: (local === 'Home') ? match.homeTeam : match.awayTeam,
      teamNotInFocus: (local === 'Home') ? match.awayTeam : match.homeTeam,
      inProgress: match.inProgress,
      inFocusTeam: (local === 'Home') ? match.teamHome : match.teamAway,
      notInFocusTeam: (local === 'Home') ? match.teamAway : match.teamHome,
    }));
  }

  private static filterGeneralTeamMatchList(
    teamName: string,
    matches: Array<MatchDTO>,
  ): Array<MatchDTO> {
    const teamMatchList: Array<MatchDTO> = [];
    teamMatchList.push(...matches.filter((match) => (
      match.teamHome.teamName === teamName || match.teamAway.teamName === teamName
    )));
    return teamMatchList;
  }

  // eslint-disable-next-line max-lines-per-function
  public static generalTeamMatchList(
    teamName: string,
    matches: Array<MatchDTO>,
  ): Array<LeaderboardMatchDTO> {
    return CalculateLeaderboard
      .filterGeneralTeamMatchList(teamName, matches)
      .map((tmatch) => {
        const condition = tmatch.teamHome.teamName === teamName;
        return {
          teamInFocusGoals: (condition) ? tmatch.homeTeamGoals : tmatch.awayTeamGoals,
          teamNotInFocusGoals: (condition) ? tmatch.awayTeamGoals : tmatch.homeTeamGoals,
          teamInFocus: (condition) ? tmatch.homeTeam : tmatch.awayTeam,
          teamNotInFocus: (condition) ? tmatch.awayTeam : tmatch.homeTeam,
          inProgress: tmatch.inProgress,
          inFocusTeam: (condition) ? tmatch.teamHome : tmatch.teamAway,
          notInFocusTeam: (condition) ? tmatch.teamAway : tmatch.teamHome,
        };
      });
  }

  public static totalPoints(
    teamName: string,
    local: Local | null,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = (local)
      ? CalculateLeaderboard.localTeamMatchList(teamName, local, matches)
      : CalculateLeaderboard.generalTeamMatchList(teamName, matches);
    const totalPoints = teamMatchList.reduce((acc, match) => {
      if (match.teamInFocusGoals > match.teamNotInFocusGoals) return acc + 3;
      if (match.teamInFocusGoals < match.teamNotInFocusGoals) return acc;
      return acc + 1;
    }, 0);
    return totalPoints;
  }

  public static totalGames(
    teamName: string,
    local: Local | null,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = (local)
      ? CalculateLeaderboard.localTeamMatchList(teamName, local, matches)
      : CalculateLeaderboard.generalTeamMatchList(teamName, matches);
    return teamMatchList.length;
  }

  public static totalVictories(
    teamName: string,
    local: Local | null,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = (local)
      ? CalculateLeaderboard.localTeamMatchList(teamName, local, matches)
      : CalculateLeaderboard.generalTeamMatchList(teamName, matches);
    const totalVictories = teamMatchList.reduce((acc, match) => (
      (match.teamInFocusGoals > match.teamNotInFocusGoals) ? acc + 1 : acc
    ), 0);
    return totalVictories;
  }

  public static totalDraws(
    teamName: string,
    local: Local | null,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = (local)
      ? CalculateLeaderboard.localTeamMatchList(teamName, local, matches)
      : CalculateLeaderboard.generalTeamMatchList(teamName, matches);
    const totalDraws = teamMatchList.reduce((acc, match) => (
      (match.teamInFocusGoals === match.teamNotInFocusGoals) ? acc + 1 : acc
    ), 0);
    return totalDraws;
  }

  public static totalLosses(
    teamName: string,
    local: Local | null,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = (local)
      ? CalculateLeaderboard.localTeamMatchList(teamName, local, matches)
      : CalculateLeaderboard.generalTeamMatchList(teamName, matches);
    const totalLosses = teamMatchList.reduce((acc, match) => (
      (match.teamInFocusGoals < match.teamNotInFocusGoals) ? acc + 1 : acc
    ), 0);
    return totalLosses;
  }

  public static goalsFavor(
    teamName: string,
    local: Local | null,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = (local)
      ? CalculateLeaderboard.localTeamMatchList(teamName, local, matches)
      : CalculateLeaderboard.generalTeamMatchList(teamName, matches);
    const totalLosses = teamMatchList.reduce((acc, match) => (
      acc + match.teamInFocusGoals
    ), 0);
    return totalLosses;
  }

  public static goalsOwn(
    teamName: string,
    local: Local | null,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = (local)
      ? CalculateLeaderboard.localTeamMatchList(teamName, local, matches)
      : CalculateLeaderboard.generalTeamMatchList(teamName, matches);
    const goalsOwn = teamMatchList.reduce((acc, match) => (
      acc + match.teamNotInFocusGoals
    ), 0);
    return goalsOwn;
  }

  public static goalsBalance(
    teamName: string,
    local: Local | null,
    matches: Array<MatchDTO>,
  ): number {
    const teamMatchList = (local)
      ? CalculateLeaderboard.localTeamMatchList(teamName, local, matches)
      : CalculateLeaderboard.generalTeamMatchList(teamName, matches);
    const goalsBalance = teamMatchList.reduce((acc, match) => (
      acc + match.teamInFocusGoals - match.teamNotInFocusGoals
    ), 0);
    return goalsBalance;
  }

  public static efficiency(
    teamName: string,
    local: Local | null,
    matches: Array<MatchDTO>,
  ): string {
    const totalPoints = CalculateLeaderboard.totalPoints(teamName, local, matches);
    const totalGames = CalculateLeaderboard.totalGames(teamName, local, matches);
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return efficiency;
  }
}

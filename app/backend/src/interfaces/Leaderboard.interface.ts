export interface LeaderboardDTO {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export default interface LeaderboardMatchDTO {
  teamInFocusGoals: number;
  teamNotInFocusGoals: number;
  teamInFocus: number;
  teamNotInFocus: number;
  inProgress: boolean;
  inFocusTeam: {
    teamName: string
  };

  notInFocusTeam: {
    teamName: string
  };
}

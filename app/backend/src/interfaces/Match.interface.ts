export interface MatchTeamGoalsNumber {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface MatchCreateRequest extends MatchTeamGoalsNumber {
  homeTeam: number;
  awayTeam: number;
}

export interface MatchCreateResponse extends MatchCreateRequest {
  inProgress: boolean;
}

export default interface MatchDTO extends MatchCreateResponse{
  teamHome: {
    teamName: string
  };

  teamAway: {
    teamName: string
  };
}

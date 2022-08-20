export interface MatchCreateRequest {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
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

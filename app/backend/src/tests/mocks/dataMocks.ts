//
// users ---------------------------------------------------------------
//
export const loginUserRequest = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

export const loginUserRepositoryFindOneResponse = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

export const nonExistingEmailLoginRequest = { password: 'mypassword' }

export const nonExistingPasswordLoginRequest = { email: 'teste@teste' }

export const invalidEmailLoginRequest = { 
  email: 'invalid@email.com',
  password: 'secret_admin'
}

export const invalidPasswordLoginRequest = { 
  email: 'admin@admin.com',
  password: 'invalidpassword'
}

export const loginValidateResponse = {
  role: 'admin',
}

//
// teams ---------------------------------------------------------------
//

export const teamsGetAllResponse = [
  {
    id: 1,
    teamName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    teamName: 'Bahia',
  },
  {
    id: 3,
    teamName: 'Botafogo',
  },
]

//
// matches ---------------------------------------------------------------
//

export const matchesGetAllResponse = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 2,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: {
      teamName: 'Avaí/Kindermann'
    },
    teamAway: {
      teamName: 'Bahia'
    }
  },
  {
    id: 2,
    homeTeam: 3,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Botafogo'
    },
    teamAway: {
      teamName: 'Avaí/Kindermann'
    }
  },
  {
    id: 3,
    homeTeam: 2,
    homeTeamGoals: 3,
    awayTeam: 3,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: {
      teamName: 'Bahia'
    },
    teamAway: {
      teamName: 'Botafogo'
    }
  },
]

export const matchesGetAllByProgressEqualTrueResponse = [
  {
    id: 2,
    homeTeam: 3,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'Botafogo'
    },
    teamAway: {
      teamName: 'Avaí/Kindermann'
    }
  },
]

export const matchesGetAllByProgressEqualFalseResponse = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 2,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: {
      teamName: 'Avaí/Kindermann'
    },
    teamAway: {
      teamName: 'Bahia'
    }
  },
  {
    id: 2,
    homeTeam: 3,
    homeTeamGoals: 1,
    awayTeam: 1,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Botafogo'
    },
    teamAway: {
      teamName: 'Avaí/Kindermann'
    }
  },
  {
    id: 3,
    homeTeam: 2,
    homeTeamGoals: 3,
    awayTeam: 3,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: {
      teamName: 'Bahia'
    },
    teamAway: {
      teamName: 'Botafogo'
    }
  },
]

export const createMatchWithInProgressEqualTrueRequest = {
  homeTeam: 1,
  awayTeam: 2, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export const createMatchWithInProgressEqualTrueResponse = {
  id: 1,
  homeTeam: 1,
  awayTeam: 2, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
}

export const createMatchWithEqualTeamsRequest = {
  homeTeam: 1,
  awayTeam: 1, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export const createMatchWithNonExistentRequest = {
  homeTeam: 1,
  awayTeam: 9999, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

//
// leaderboard ---------------------------------------------------------------
//

export const leaderboardGetAllByHomeTeamResponse = [
  {
    efficiency: '100.00',
    goalsBalance: 1,
    goalsFavor: 1,
    goalsOwn: 0,
    name: 'Botafogo',
    totalDraws: 0,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 3,
    totalVictories: 1,
  },
  {
   efficiency: '33.33',
    goalsBalance: 0,
    goalsFavor: 3,
    goalsOwn: 3,
    name: 'Bahia',
    totalDraws: 1,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 1,
    totalVictories: 0,
  },
  {
    efficiency: '0.00',
    goalsBalance: -1,
    goalsFavor: 2,
    goalsOwn: 3,
    name: 'Avaí/Kindermann',
    totalDraws: 0,
    totalGames: 1,
    totalLosses: 1,
    totalPoints: 0,
    totalVictories: 0,
},
]

export const leaderboardGetAllByAwayTeamResponse = [
  {
    efficiency: '100.00',
    goalsBalance: 1,
    goalsFavor: 3,
    goalsOwn: 2,
    name: 'Bahia',
    totalDraws: 0,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 3,
    totalVictories: 1,
  },
  {
    efficiency: '33.33',
    goalsBalance: 0,
    goalsFavor: 3,
    goalsOwn: 3,
    name: 'Botafogo',
    totalDraws: 1,
    totalGames: 1,
    totalLosses: 0,
    totalPoints: 1,
    totalVictories: 0,
  },
  {
    efficiency: '0.00',
    goalsBalance: -1,
    goalsFavor: 0,
    goalsOwn: 1,
    name: 'Avaí/Kindermann',
    totalDraws: 0,
    totalGames: 1,
    totalLosses: 1,
    totalPoints: 0,
    totalVictories: 0,
  }
]
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

export const nonExistingEmailLoginRequest = { password: "mypassword" }

export const nonExistingPasswordLoginRequest = { email: "teste@teste" }

export const invalidEmailLoginRequest = { 
  email: "invalid@email.com",
  password: "secret_admin"
}

export const invalidPasswordLoginRequest = { 
  email: "admin@admin.com",
  password: "invalidpassword"
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

export const matchesGetAllResponse = [
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 2,
    awayTeam: 2,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: {
      teamName: "Avaí/Kindermann"
    },
    teamAway: {
      teamName: "Bahia"
    }
  },
  {
    id: 2,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "Avaí/Kindermann"
    },
    teamAway: {
      teamName: "Botafogo"
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
      teamName: "Avaí/Kindermann"
    },
    teamAway: {
      teamName: "Botafogo"
    }
  },
]

export const matchesGetAllByProgressEqualTrueResponse = [
  {
    id: 2,
    homeTeam: 1,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: "Avaí/Kindermann"
    },
    teamAway: {
      teamName: "Botafogo"
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
      teamName: "Avaí/Kindermann"
    },
    teamAway: {
      teamName: "Bahia"
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
      teamName: "Avaí/Kindermann"
    },
    teamAway: {
      teamName: "Botafogo"
    }
  },
]

export const createMatchWithInProgressEqualTrueRequest = {
  homeTeam: 16,
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

export const createMatchWithInProgressEqualTrueResponse = {
  id: 1,
  homeTeam: 16,
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
}
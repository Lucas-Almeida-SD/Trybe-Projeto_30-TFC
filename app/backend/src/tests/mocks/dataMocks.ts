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
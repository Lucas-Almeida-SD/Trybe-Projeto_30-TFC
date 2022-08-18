export const loginUserRepositoryFindOneResponse = {
  id: 1,
  username: 'Lucas Almeida',
  role: 'Admin',
  email: 'lucas@teste.com',
  password: 'mypassword',
}

export const nonExistingEmailLoginRequest = { password: "mypassword" }

export const nonExistingPasswordLoginRequest = { email: "teste@teste" }

export const invalidEmailLoginRequest = { 
  email: "invalid@email.com",
  password: "mypassword"
}

export interface User {
  id: number;
  username: string;
  role: string;
  email: string;
}

export interface UserDTO extends User{
  password: string;
}

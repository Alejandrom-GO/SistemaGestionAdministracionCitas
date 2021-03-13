export type Roles = '  USER' | 'ADMIN';

export interface User {
  username: string;
  password: string;
}

export interface UserResponse extends User {
  code: number;
  area: string;
  mat: number;
  message: string;
  token: string;
  userId: number;
  role: Roles;
}

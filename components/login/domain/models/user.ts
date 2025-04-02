export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  playList: [];
  createdAt: string;
  updatedAt: string;
}

export interface AuthData {
  user?: User | null;
  token: string | null;
}

export interface RequetsLogin {
  email: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
  user: User;
}

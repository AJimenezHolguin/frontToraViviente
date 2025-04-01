export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthData {
  user?: User | null;
  token: string | null;
}

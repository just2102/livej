export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUserAuth {
  email: string;
}

export interface IUserAuthContext {
  user: IUserAuth;
}

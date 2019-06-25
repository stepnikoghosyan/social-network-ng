export interface IParsedJwt {
  readonly email: string;
  readonly exp: number;
  readonly orig_iat: number;
  readonly user_id: number;
  readonly username: string;
}

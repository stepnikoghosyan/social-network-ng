export interface UserModel {
  readonly auth_token: string;
  readonly refresh_token: string;
  readonly _id: string;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
}

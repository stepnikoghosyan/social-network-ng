export interface UserModel {
  readonly authToken: string;
  readonly refreshToken: string;
  readonly _id: string;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
}

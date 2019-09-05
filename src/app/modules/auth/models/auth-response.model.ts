export interface AuthResponseModel {
  readonly userId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly authToken: string;
  readonly refreshToken: string;
  readonly profilePicture: string;
  // readonly last_online: Date;
  // readonly is_online: boolean;
  // readonly friends: Array<AuthResponseModel>;
}

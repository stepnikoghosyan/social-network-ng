import {IParsedJwt} from '../../modules/auth/models/jwt.model';

export function parseJwt(token: string): IParsedJwt {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

// services
import {BaseRestService} from '../../../shared/services/base-rest.service';

// models
import {UserModel} from '../models/user.model';
import {IAuthModel} from '../models/auth.model';

// utils
import {parseJwt} from '../../../shared/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseRestService<IAuthModel> {
  public user: UserModel;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly handler: HttpBackend,
  ) {
    super(http);
  }

  public login(user: IAuthModel): Observable<UserModel> {
    const httpClient = new HttpClient(this.handler);
    return httpClient.post<UserModel>(`${this.apiUrl}auth/login`, user, {headers: null}).pipe(
      tap((res: UserModel): void => {
        this.user = res;
        this.setAuthToken = res.auth_token;
        this.setRefreshToken = res.refresh_token;
      })
    );
  }

  public getNewAccessToken(): Observable<Partial<UserModel>> {
    return this.post('/users/refresh-api-token', {refresh: this.getRefreshToken});
  }

  public get isAuthenticated(): boolean {
    const token = this.getAuthToken;
    try {
      const {exp} = parseJwt(token);

      if (Date.now() / 1000 > exp) {
        return false;
      }
    } catch (err) {
      return false;
    }

    return true;
  }

  public set setAuthToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  public set setRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
  }

  public get getAuthToken(): string {
    return localStorage.getItem('auth_token');
  }

  public get getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}

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
import {ResponseModel} from '../../../shared/models/response.model';

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
    private readonly handler: HttpBackend
  ) {
    super(http);
  }

  public login(user: IAuthModel): Observable<ResponseModel<UserModel>> {
    const httpClient = new HttpClient(this.handler);
    return httpClient.post<ResponseModel<UserModel>>(`${this.apiUrl}auth/login`, user, {headers: null}).pipe(
      tap((res: ResponseModel<UserModel>): void => {
        this.user = res.data;
        this.setAuthToken = res.data.authToken;
        this.setRefreshToken = res.data.refreshToken;
      })
    );
  }

  public register(data: IAuthModel): Observable<ResponseModel<UserModel>> {
    console.log('REGISTER:', data);
    return this.post<IAuthModel, ResponseModel<UserModel>>('auth/register', data);
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
    localStorage.setItem('authToken', token);
  }

  public set setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  public get getAuthToken(): string {
    return localStorage.getItem('authToken');
  }

  public get getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/auth/signin');
  }
}

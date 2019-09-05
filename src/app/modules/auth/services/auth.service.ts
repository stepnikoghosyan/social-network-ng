import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

// services
import {BaseRestService} from '../../../shared/services/base-rest.service';

// models
import {AuthResponseModel} from '../models/auth-response.model';
import {IAuthPayloadModel} from '../models/auth-payload.model';
import {ResponseModel} from '../../../shared/models/response.model';

// utils
import {parseJwt} from '../../../shared/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseRestService<IAuthPayloadModel> {
  public user: AuthResponseModel;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly handler: HttpBackend
  ) {
    super(http);
  }

  public login(user: IAuthPayloadModel): Observable<ResponseModel<AuthResponseModel>> {
    const httpClient = new HttpClient(this.handler);
    return httpClient.post<ResponseModel<AuthResponseModel>>(`${this.apiUrl}auth/login`, user, {headers: null}).pipe(
      tap((res: ResponseModel<AuthResponseModel>): void => {
        this.user = res.data;
        this.setAuthToken = res.data.authToken;
        this.setRefreshToken = res.data.refreshToken;
      })
    );
  }

  public register(data: IAuthPayloadModel): Observable<ResponseModel<AuthResponseModel>> {
    console.log('REGISTER:', data);
    return this.post<IAuthPayloadModel, ResponseModel<AuthResponseModel>>('auth/register', data);
  }

  public getNewAccessToken(): Observable<Partial<AuthResponseModel>> {
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

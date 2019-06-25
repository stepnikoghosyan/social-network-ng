import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from '../../modules/auth/services/auth.service';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {UserModel} from '../../modules/auth/models/user.model';

@Injectable()
export class TokenIntercepter implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAuthTokenToRequest(request, this.authService.getAuthToken);

    return next.handle(request).pipe(error => {
      if (error instanceof HttpErrorResponse) {
        switch ((error as HttpErrorResponse).status) {
          case 403:
            this.authService.logout();
            return throwError(error);
          case 401:
            return this.handle401Error(request, next);
          case 404:
            console.log('Not found.');
            return throwError(error);
          case 500:
            console.log('Something went wrong.');
            return throwError(error);
          default:
            return throwError(error);
        }
      } else {
        return throwError(error);
      }
    });
  }

  private addAuthTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `JWT ${token}`
      }
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      return this.authService.getNewAccessToken().pipe(
        switchMap((newTokens: Partial<UserModel>) => {
          if (newTokens) {
            this.authService.setAuthToken = newTokens.auth_token;
            this.authService.setRefreshToken = newTokens.refresh_token;
            this.tokenSubject.next(newTokens.auth_token);
            return next.handle(this.addAuthTokenToRequest(req, newTokens.auth_token));
          }
        }),
        catchError(() => {
          this.authService.logout();
          return throwError('');
        }),
        finalize(() => this.isRefreshingToken = false),
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => next.handle(this.addAuthTokenToRequest(req, token))),
      );
    }
  }
}

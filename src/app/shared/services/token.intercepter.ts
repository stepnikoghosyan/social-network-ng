import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from '../../modules/auth/services/auth.service';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {AuthResponseModel} from '../../modules/auth/models/auth-response.model';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class TokenIntercepter implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private readonly authService: AuthService,
    private readonly toastr: ToastrService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAuthTokenToRequest(request, this.authService.getAuthToken);

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        switch ((error as HttpErrorResponse).status) {
          case 403:
            this.toastr.error('Error 403');
            this.authService.logout();
            return throwError(error);
          case 401:
            this.toastr.error('Error 401');
            return this.handle401Error(request, next);
          case 404:
            this.toastr.error('Not found.');
            return throwError(error);
          case 500:
            this.toastr.error('Something went wrong.');
            return throwError(error);
          default:
            return throwError(error);
        }
      } else {
        return throwError(error);
      }
    }));
  }

  private addAuthTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      return this.authService.getNewAccessToken().pipe(
        switchMap((newTokens: Partial<AuthResponseModel>) => {
          if (newTokens) {
            this.authService.setAuthToken = newTokens.authToken;
            this.authService.setRefreshToken = newTokens.refreshToken;
            this.tokenSubject.next(newTokens.authToken);
            return next.handle(this.addAuthTokenToRequest(req, newTokens.authToken));
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

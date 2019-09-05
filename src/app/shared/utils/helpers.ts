import {IParsedJwt} from '../../modules/auth/models/jwt.model';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';
import {IParam} from '../models/param.model';
import {ToastrService} from 'ngx-toastr';
import {FormErrorResponseModel, ResponseModel} from '../models/response.model';

export function parseJwt(token: string): IParsedJwt {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

export function anyToHttpParams(obj: IParam): HttpParams {
  let param = new HttpParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      param = param.set(key, obj[key] as string);
    }
  }
  return param;
}

export function appErrorHandler(error: HttpErrorResponse, toastr: ToastrService): void {
  const apiError: FormErrorResponseModel = error.error;
  console.log('My Error:', error);

  toastr.error(
    apiError.errorMessage ? apiError.errorMessage : 'Oops! Try again.',
    'Error',
  );
}

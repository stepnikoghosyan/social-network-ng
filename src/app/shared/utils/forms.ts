import {FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {FormErrorResponseModel} from '../models/response.model';

export abstract class FormValidation {
  public responseErrorMessage: string;
  public errorField: string;

  public isFieldValid(form: FormGroup, controlName: string, submitted: string): boolean {
    return form.get(controlName).invalid && form.get(controlName).touched || form.get(controlName).dirty || this[submitted];
  }

  public displayErrorStyle(form: FormGroup, controlName: string, submitted: string, cssClass: string): { [key: string]: boolean } {
    const error = Object.create(null);
    error[cssClass] = this.isFieldValid(form, controlName, submitted);
    return error;
  }

  protected formsResponseErrorHandler(error: HttpErrorResponse): void {
    const apiError: Partial<FormErrorResponseModel> = error.error;
    console.log('My Error:', error);

    this.responseErrorMessage = apiError.errorMessage ? apiError.errorMessage : 'Oops! Try again.';
    this.errorField = apiError.field ? apiError.field : undefined;
  }
}

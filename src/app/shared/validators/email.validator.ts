import {AbstractControl} from '@angular/forms';

export const emailPattern = /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,6})+$/;

export function EmailPatternValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.value) {
    return;
  }

  const isValid = control.value.match(emailPattern);
  return isValid ? null : {email: true};
}

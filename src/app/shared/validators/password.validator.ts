import {AbstractControl} from '@angular/forms';

export const passwordPattern =
  /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)(?=.*[.*+?^$#@!%+=&_{}()|[\W-\]\\]+.*)[0-9a-zA-Z.*+?^$#@!%+=&_{}()|[\W-\]\\]{8,}$/;

export function PasswordPatternValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (!control.value) {
    return;
  }

  const isValid = control.value.match(passwordPattern);
  return isValid ? null : {password: true};
}

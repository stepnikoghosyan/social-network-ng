import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

// services
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';

// models
import {ResponseModel} from '../../../../shared/models/response.model';
import {IAuthPayloadModel} from '../../models/auth-payload.model';
import {AuthResponseModel} from '../../models/auth-response.model';

// utils
import {FormValidation} from '../../../../shared/utils/forms';
import {AUTH_MESSAGES} from '../../../../shared/utils/validation-messages';
import {emailPattern} from '../../../../shared/validators/email.validator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends FormValidation implements OnInit, OnDestroy {

  public form: FormGroup;
  public validationMessages = AUTH_MESSAGES;
  private $subscription: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.generateForm();
  }

  ngOnDestroy(): void {
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  private generateForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailPattern)]],
      password: [null, [Validators.required]]
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.signIn(this.form.value);
    } else {
      this.toastr.error('Form Error.');
      console.log(this.form.errors);
      console.log(this.form.controls.email.errors);
      console.log(this.form.controls.password.errors);
    }
  }

  private signIn(credentials: IAuthPayloadModel): void {
    this.$subscription = this.authService.login(credentials)
      .subscribe(
        (result: ResponseModel<AuthResponseModel>) => this.successHandler(result),
        (error: HttpErrorResponse) => this.formsResponseErrorHandler(error),
      );
  }

  private successHandler(result: ResponseModel<AuthResponseModel>): void {
    console.log('Logged in.', result.data);
    this.authService.setAuthToken = result.data.authToken;
    this.authService.setRefreshToken = result.data.refreshToken;
    console.log('navigating...');
    this.router.navigateByUrl('/');
  }
}

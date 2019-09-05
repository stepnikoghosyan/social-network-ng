import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

// services
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

// models
import {ResponseModel} from '../../../../shared/models/response.model';
import {IAuthPayloadModel} from '../../models/auth-payload.model';
import {AuthResponseModel} from '../../models/auth-response.model';

// utils
import {appErrorHandler} from '../../../../shared/utils/helpers';
import {AUTH_MESSAGES} from '../../../../shared/utils/validation-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public validationMessages = AUTH_MESSAGES;
  private $subscription: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ) {
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
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      console.log('FORM ERROR');
    } else {
      this.signUp(this.form.value);
    }
  }

  private signUp(values: IAuthPayloadModel): void {
    console.log('TRY to register:', values);

    this.$subscription = this.authService.register(values)
      .subscribe(
        (result: ResponseModel<AuthResponseModel>) => {
          console.log('RESPONSE:', result);
          this.authService.setAuthToken = (result.data as AuthResponseModel).authToken;
          this.authService.setRefreshToken = (result.data as AuthResponseModel).refreshToken;
          this.router.navigateByUrl('/');
        },
        (error: HttpErrorResponse) => {
          appErrorHandler(error, this.toastr);
        }
      );
  }
}

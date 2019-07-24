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
import {IAuthModel} from '../../models/auth.model';
import {UserModel} from '../../models/user.model';

// utils
import {appErrorHandler} from '../../../../shared/utils/helpers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public form: FormGroup;
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
      username: [null, [Validators.required]],
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

  private signUp(values: IAuthModel): void {
    console.log('TRY to register:', values);

    this.$subscription = this.authService.register(values)
      .subscribe(
        (result: ResponseModel<UserModel>) => {
          console.log('RESPONSE:', result);
          this.authService.setAuthToken = (result.data as UserModel).authToken;
          this.authService.setRefreshToken = (result.data as UserModel).refreshToken;
          this.router.navigateByUrl('/');
        },
        (error: HttpErrorResponse) => {
          appErrorHandler(error, this.toastr);
        }
      );
  }
}

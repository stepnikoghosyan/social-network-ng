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
import {IAuthModel} from '../../models/auth.model';
import {UserModel} from '../../models/user.model';

// utils
import {FormValidation} from '../../../../shared/utils/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends FormValidation implements OnInit, OnDestroy {

  public form: FormGroup;
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
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.signIn(this.form.value);
    } else {
      this.toastr.error('Form Error.');
    }
  }

  private signIn(credentials: IAuthModel): void {
    this.$subscription = this.authService.login(credentials)
      .subscribe(
        (result: ResponseModel<UserModel>) => this.successHandler(result),
        (error: HttpErrorResponse) => this.formsResponseErrorHandler(error),
      );
  }

  private successHandler(result: ResponseModel<UserModel>): void {
    console.log('Logged in.', result.data);
    this.authService.setAuthToken = result.data.authToken;
    this.authService.setRefreshToken = result.data.refreshToken;
    console.log('navigating...');
    this.router.navigateByUrl('/');
  }
}

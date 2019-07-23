import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';

const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: 'signin', component: SigninComponent},
      {path: 'signup', component: SignupComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(AuthRoutes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
}

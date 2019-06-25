import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../modules/auth/services/auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class SigninGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}

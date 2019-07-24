import {Component} from '@angular/core';
import {AuthService} from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent {
  public menuItems = [
    {
      title: 'Messages',
      link: '/',
    },
  ];

  constructor(private readonly authService: AuthService) {
  }

  public onLogoutClick(): void {
    this.authService.logout();
  }
}

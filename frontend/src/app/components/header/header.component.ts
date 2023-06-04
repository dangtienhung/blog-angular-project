import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  TOKEN_USER = 'user';
  constructor(private auth: AuthService, private router: Router) {}

  user = this.auth.getUserLogin();
  // isAuth = this.auth.isAuthenticated();

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/']);
    location.reload();
  }
}

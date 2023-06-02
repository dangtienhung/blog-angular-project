import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private auth: AuthService, private router : Router) {
  }
  isAuth = this.auth.isAuthenticated();
  logOut() {
    this.auth.logOut();
    this.router.navigate(['/']);
    console.log('nhung');
    
  }
}

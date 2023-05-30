import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss'],
})
export class LayoutAdminComponent {
  constructor(private router: Router) {
    if (localStorage.getItem('accessToken')) {
      const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
      if (accessToken === '') {
        this.router.navigate(['/login-admin']);
      }
      const date = new Date();
      const time = date.getTime() / 1000;
      const decodeToken: any = jwt_decode(accessToken);
      if (decodeToken.exp < time) {
        this.router.navigate(['/login-admin']);
      }
    }
  }
  // ngOnInit(): void {
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   if (localStorage.getItem('accessToken')) {
  //     const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
  //     if (accessToken === '') {
  //       this.router.navigate(['/']);
  //     }
  //     const date = new Date();
  //     const time = date.getTime() / 1000;
  //     const decodeToken: any = jwt_decode(accessToken);
  //     if (decodeToken.exp < time) {
  //       this.router.navigate(['/']);
  //     }
  //   }
  // }
}

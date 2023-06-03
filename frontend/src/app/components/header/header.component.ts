import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth/auth.service';
// import { UserService } from 'src/app/services/users/user.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLogin: boolean = localStorage.getItem('accessToken') ? true : false;
  isHidden: boolean = true;
  userInfo: IUser = JSON.parse(localStorage.getItem('user')!);
  constructor(private auth: AuthService, private toastr: ToastrService) {}

  handleLogout() {
    Swal.fire({
      title: 'Do you want logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, I want!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.auth.logOut();
        this.isLogin = false;
        this.toastr.success('Logout successful');
      }
    });
  }
  toggleDropdown() {
    this.isHidden = !this.isHidden;
  }
}

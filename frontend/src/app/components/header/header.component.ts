import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';
import { IUser } from 'src/app/interfaces/User';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';

// import { UserService } from 'src/app/services/users/user.service';

// import { FormBuilder } from '@angular/forms';

// import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLogin: boolean = localStorage.getItem('accessToken') ? true : false;
  isHidden: boolean = true;
  userInfo: IUser = JSON.parse(localStorage.getItem(this.auth.TOKEN_USER)!);
  searchValue: string = '';
  searchResult: IPosts[] = [];
  isShowSearch: boolean = false;
  timerId!: any;

  private inputSubject = new Subject<string>();
  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private redirect: Router,
    private postsService: PostsService
  ) {
    if (!this.userInfo) {
      this.redirect.navigate(['/']);
    }
  }

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
        this.redirect.navigate(['/']);
      }
    });
  }
  toggleDropdown() {
    this.isHidden = !this.isHidden;
  }
  onInputChange(event: any) {
    this.searchValue = String(event.target.value);

    /*clear prev timeout id*/
    clearTimeout(this.timerId);
    this.isShowSearch = true;

    if (!this.searchValue) {
      /*delay when typing*/
      this.isShowSearch = false;
    }
    this.timerId = setTimeout(() => {
      this.postsService
        .searchPost(this.searchValue.trim())
        .subscribe(({ posts }) => {
          this.searchResult = posts.docs;
        });
    }, 700);
  }
  handleClear() {
    (this.searchValue = ''),
      (this.searchResult = []),
      (this.isShowSearch = false);
  }
}

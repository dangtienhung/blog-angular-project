import { Component, OnInit } from '@angular/core';
import { IUser, IUserRequest } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/users/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IPosts } from 'src/app/interfaces/Posts';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  user!: IUserRequest;
  listUserPosts!: IPosts[];
  userInfo = this.formUserInfo.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    // password: ['', [Validators.required]],
  });

  constructor(
    private profile: UserService,
    private auth: AuthService,
    private formUserInfo: FormBuilder,
    private router: ActivatedRoute
  ) {
    this.user = this.auth.getUserLogin();

    this.userInfo.patchValue({
      username: this.user.username,
      email: this.user.email,
      address: this.user.address,
      phone: this.user.phone,
    });

    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.profile.getUserPosts(id!).subscribe(
        ({ data }) => {
          if (data.postList) {
            this.listUserPosts = data.postList;
          }
        },
        (err) => {
          console.log(err.message);
        }
      );
    });
  }

  get checkUsername() {
    return this.userInfo.get('username') as FormControl;
  }

  get checkEmail() {
    return this.userInfo.get('email') as FormControl;
  }

  get checkAddress() {
    return this.userInfo.get('address') as FormControl;
  }

  get checkPhone() {
    return this.userInfo.get('phone') as FormControl;
  }

  onEdit() {
    const editProfile: IUserRequest = {
      username: this.userInfo.value.username || '',
      email: this.userInfo.value.email || '',
      address: this.userInfo.value.address || '',
      phone: this.userInfo.value.phone || '',
    };

    this.profile.updateUser(this.user._id, editProfile).subscribe((data) => {
      console.log(data);
      localStorage.setItem(this.auth.TOKEN_USER, JSON.stringify(data.user));
    });
  }
}

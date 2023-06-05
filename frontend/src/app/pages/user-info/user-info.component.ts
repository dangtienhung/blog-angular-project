import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/users/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  user!: IUser;
  userInfo = this.formUserInfo.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
    phone: [''],
    password: ['', [Validators.required]],
  });
  constructor(private auth: AuthService, private formUserInfo: FormBuilder) {
    this.user = this.auth.getUserLogin();
    this.userInfo.patchValue({
      username: this.user.username,
      email: this.user.email,
      address: this.user.address,
      phone: this.user.phone,
    });
  }
}

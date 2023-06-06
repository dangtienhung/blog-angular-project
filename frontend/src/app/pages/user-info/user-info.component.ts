import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/users/user.service';

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
  });
  constructor(
    private auth: AuthService,
    private formUserInfo: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.user = this.auth.getUserLogin();
    this.userInfo.patchValue({
      username: this.user.username,
      email: this.user.email,
      address: this.user.address,
      phone: this.user.phone,
    });
  }
  /* add form */
  handleSubmitForm() {
    if (this.userInfo.invalid) return;
    const userInfo = {
      username: this.userInfo.value.username!,
      email: this.userInfo.value.email!,
      address: this.userInfo.value.address || '',
      phone: this.userInfo.value.phone || '',
    };
    console.log(
      '🚀 ~ file: user-info.component.ts:47 ~ UserInfoComponent ~ handleSubmitForm ~ userInfo:',
      userInfo
    );
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      this.userService.updateUserInfo(id, userInfo).subscribe(() => {
        this.toastr.success('Update user info success');
      });
    });
  }
}

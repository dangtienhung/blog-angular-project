import { FormBuilder, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent {
  title: string = 'Quản lý người dùng';
  titleModal: string = 'Thêm người dùng';
  theadTable: string[] = [
    'STT',
    'Tên',
    'Email',
    'Quyền',
    'Trạng thái',
    'Action',
  ];
  usersList: IUser[] = [];
  userForm = this.builder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]],
    is_active: ['', [Validators.required]],
    avatar: ['', [Validators.required]],
  });
  constructor(private userService: UserService, private builder: FormBuilder) {
    this.getAllUsers();
  }
  /* handle delete user */
  handleDeleteUser(id: string) {
    this.userService.deleteUserFake(id).subscribe(() => {
      this.getAllUsers();
    });
  }
  /* get All users */
  getAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      console.log(users);

      this.usersList = users.docs;
    });
  }
  /* handle add new user */
  handleAddNewUser() {
    console.log(this.userForm.value);
  }
}

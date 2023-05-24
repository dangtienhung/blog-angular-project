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
  constructor(private userService: UserService) {
    this.getAllUsers();
  }
  /* handle delete user */
  handleDeleteUser(id: string) {
    console.log(id);
  }
  /* get All users */
  getAllUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.usersList = users.docs;
    });
  }
}

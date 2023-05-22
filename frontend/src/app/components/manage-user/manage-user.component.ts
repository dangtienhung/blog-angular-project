import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent {
  title: string = 'Quản lý người dùng';
  theadTable: string[] = [
    'STT',
    'Tên',
    'Email',
    'Quyền',
    'Trạng thái',
    'Action',
  ];
  /* handle delete user */
  handleDeleteUser(id: string) {
    console.log(id);
  }
}

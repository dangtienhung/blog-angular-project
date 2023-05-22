import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss'],
})
export class ManagePostsComponent {
  title: string = 'Quản lý các bài đăng';
  theadTable: string[] = [
    'STT',
    'Tên các bài đăng',
    'Hình ảnh',
    'Danh mục',
    'Giá bán',
    'Hoạt động',
    'Trạng thái',
    'Action',
    'Action',
    'Action',
    'Action',
    'Action',
    'Action',
    'Action',
    'Action',
    'Action',
    'Action',
    'Action',
    'Action',
  ];
  /* handle delete user */
  handleDeletePost(id: string) {
    console.log(id);
  }
}

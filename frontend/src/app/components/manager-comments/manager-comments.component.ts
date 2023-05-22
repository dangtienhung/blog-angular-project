import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-comments',
  templateUrl: './manager-comments.component.html',
  styleUrls: ['./manager-comments.component.scss'],
})
export class ManagerCommentsComponent {
  title: string = 'Quản lý các bình luận';
  theadTable: string[] = [
    'STT',
    'Tên bài đăng',
    'Nội dung',
    'Ngày tạo',
    'Trạng thái',
    'Action',
  ];
  /* handle delete user */
  handleDeleteComment(id: string) {
    console.log(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { IResCountComment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-manager-comments',
  templateUrl: './manager-comments.component.html',
  styleUrls: ['./manager-comments.component.scss'],
})
export class ManagerCommentsComponent implements OnInit {
  title: string = 'Quản lý các bình luận';
  theadTable: string[] = [
    'STT',
    'Tên bài đăng',
    'Tác giả',
    'SL Comment',
    'Action',
  ];
  commentList: IResCountComment[] = [];
  constructor(private commentService: CommentService) {
    console.log(this.commentList);
  }

  ngOnInit(): void {
    this.getAllCommentRefPost();
  }
  /* handle delete user */
  handleDeleteComment(id: string) {
    console.log(id);
  }

  getAllCommentRefPost() {
    this.commentService.getCommentRefPost().subscribe((data) => {
      this.commentList = data.data;
      console.log(data.data);
    });
  }
}

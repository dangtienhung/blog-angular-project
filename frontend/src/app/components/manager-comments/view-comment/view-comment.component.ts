import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResCountComment, IResViewComment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.scss'],
})
export class ViewCommentComponent {
  title: string = 'Chi tiết bình luận';
  theadTable: string[] = ['STT', 'Tác giả', 'Nội dung', 'Ngày Tạo', 'Action'];
  viewCommentsList: IResViewComment[] = [];
  constructor(
    private commentService: CommentService,
    private params: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllViewComment();
  }
  /* handle delete user */
  handleDeleteComment(id: string) {
    this.commentService
      .deleteComment(id)
      .subscribe(() => this.getAllViewComment());
  }

  getAllViewComment() {
    const id = this.params.snapshot.params['id'];
    this.commentService.getViewComment(id).subscribe((data) => {
      this.viewCommentsList = data.data;
    });
  }
}

import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserRequest } from 'src/app/interfaces/User';
import { IComment, IResViewComment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment/comment.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments-post',
  templateUrl: './comments-post.component.html',
  styleUrls: ['./comments-post.component.scss'],
})
export class CommentsPostComponent {
  @Input() idPost!: string;
  @Input() comments!: IResViewComment[];
  userId!: string;
  user!: IUserRequest;
  idComment!: string;
  constructor(
    private commentService: CommentService,
    private commentForm: FormBuilder,
    private Toast: ToastrService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = this.user._id || '';
  }

  formAddComment = this.commentForm.group({
    content: ['', [Validators.required]],
  });

  formEditComment = this.commentForm.group({
    content: ['', [Validators.required]],
  });

  get checkEditContent() {
    return this.formEditComment.get('content') as FormControl;
  }

  get checkAddContent() {
    return this.formAddComment.get('content') as FormControl;
  }

  addComment() {
    const comment: IComment = {
      userId: this.userId || '',
      postId: this.idPost || '',
      content: this.formAddComment.value.content || '',
    };

    if (!this.userId) {
      this.Toast.warning('Bạn cần phải đăng nhập');
    }

    if (this.formAddComment.valid && this.userId) {
      this.commentService.sendComment(comment).subscribe((comment) => {
        console.log(comment);
      });
      window.location.reload();
    }
  }

  handleDelete(id: string) {
    // console.log(id);
    Swal.fire({
      title: 'Do you want to delete this comment?',
      showCancelButton: true,
      confirmButtonText: 'Yes, I want!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.commentService.deleteComment(id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  getDetailComment(id: string) {
    this.idComment = id
    console.log(id);
    this.commentService.getDetailComment(id).subscribe((comment) => {
      // console.log(comment.data);
      this.formEditComment.patchValue({
        content: comment.data.content,
      });
    });

    // Swal.fire({
    //   title: 'Chỉnh sửa bình luận',
    //   html: `<form>
    //           <textarea id="content" class="form-control" id="textAreaExample"
    //               rows="4" style="background: #fff;">
    //           </textarea>
    //         </form>`,
    //   confirmButtonText: 'Save',
    //   focusConfirm: false,
    // }).then((result) => {
    //   if (result.value) {
    //   }
    // });
  }

  handleEdit(id: string) {
    
    const comment: IComment = {
      userId: this.userId || '',
      postId: this.idPost || '',
      content: this.formEditComment.value.content || '',
    };

    console.log(id);

    // console.log(comment);

    if (this.formEditComment.valid ) {
      this.commentService.updateComment(id, comment).subscribe((data)=> {
        console.log(data);
      })
      window.location.reload();
    }
  }
}

import { ActivatedRoute, Router } from '@angular/router';
import { IComment, IResViewComment } from 'src/app/interfaces/comment';

import { CategoryService } from 'src/app/services/category/category.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { Component } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts/posts.service';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-detail-page',
  templateUrl: './posts-detail-page.component.html',
  styleUrls: ['./posts-detail-page.component.scss'],
})
export class PostsDetailPageComponent {
  post!: IPosts;
  relatedPosts!: IPosts[];
  comments!: IResViewComment[];
  idPost!: string;
  constructor(
    private postService: PostsService,
    private cateService: CategoryService,
    private router: ActivatedRoute,
    private redirect: Router,
    private toastr: ToastrService,
    private commentService: CommentService,
    private socket: Socket
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');
      // console.log(id);

      this.idPost = id || '';

      // this.commentService.getViewComment(this.idPost).subscribe((comment) => {
      //   this.comments = comment.data;
      //   console.log(this.comments);
      // });
      if (this.idPost) {
        /* get all comment by id with socket */
        this.socket.emit('getDocs', this.idPost);
        this.socket.on('comments', (data: any) => {
          this.comments = data;
        });
      }

      this.postService.getPost(id!).subscribe(
        (data) => {
          this.post = data.post;

          // console.log(data.post.category._id);
          this.cateService
            .getRelatedPost(data.post.category._id)
            .subscribe(({ data }) => {
              this.relatedPosts = data.posts!;
              // console.log(data.posts);
            });
        },
        () => {
          this.toastr.error("Couldn't find this post.Please try again😥😥");
          // alert("Couldn't find this post.Please try again😥😥");
          this.redirect.navigate(['/']);
        }
      );
    });
  }
}

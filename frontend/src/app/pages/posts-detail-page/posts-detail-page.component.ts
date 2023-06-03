import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPosts } from 'src/app/interfaces/Posts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts-detail-page',
  templateUrl: './posts-detail-page.component.html',
  styleUrls: ['./posts-detail-page.component.scss'],
})
export class PostsDetailPageComponent {
  post!: IPosts;
  constructor(
    private postService: PostsService,
    private router: ActivatedRoute,
    private redirect: Router,
    private toastr: ToastrService
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');

      this.postService.getPost(id!).subscribe(
        (data) => {
          this.post = data.post;
          // console.log(this.post);
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

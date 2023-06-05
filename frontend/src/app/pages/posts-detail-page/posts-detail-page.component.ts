import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPosts } from 'src/app/interfaces/Posts';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-posts-detail-page',
  templateUrl: './posts-detail-page.component.html',
  styleUrls: ['./posts-detail-page.component.scss'],
})
export class PostsDetailPageComponent {
  post!: IPosts;
  relatedPosts!: IPosts[];
  constructor(
    private postService: PostsService,
    private cateService: CategoryService,
    private router: ActivatedRoute,
    private redirect: Router,
    private toastr: ToastrService
  ) {
    this.router.paramMap.subscribe((params) => {
      const id = params.get('id');

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

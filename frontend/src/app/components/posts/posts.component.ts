import { Component } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts/posts.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  /* config slider */
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  posts: IPosts[] = [];
  constructor(private postService: PostsService) {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.posts.docs;
    });
  }
}

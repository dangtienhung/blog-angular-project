import { Component } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  /* config slider */
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    vertical: true,
    dots: false,
  };
  posts: IPosts[] = [];

  constructor(private postService: PostsService) {
    this.postService.getAllPosts().subscribe((data) => {
      console.log(data.posts.docs);
      this.posts = data.posts.docs;
    });
  }
}

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
    this.postService.getPostsApporved().subscribe((data) => {
      this.posts = data.posts.docs;
    });
  }
  handleFomatDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript tính từ 0 - 11, nên cần cộng 1
    const year = date.getFullYear();
    // Định dạng lại chuỗi ngày, tháng, năm
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}

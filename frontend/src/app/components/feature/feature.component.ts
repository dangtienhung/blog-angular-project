import { AfterViewInit, Component, ElementRef } from '@angular/core';

import { IPosts } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent {
  featureLists: IPosts[] = [];
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  constructor(private postsService: PostsService) {
    this.getAllPosts();
  }
  /* get all posts */
  getAllPosts() {
    this.postsService.getPostsApporved().subscribe((res) => {
      this.featureLists = res.posts.docs;
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

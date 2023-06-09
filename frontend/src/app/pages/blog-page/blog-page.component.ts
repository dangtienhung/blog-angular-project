import { Component } from '@angular/core';
import { ICategory } from 'src/app/interfaces/Category';
import { IPosts } from 'src/app/interfaces/Posts';
import { CategoryService } from 'src/app/services/category/category.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent {
  isActive = false;
  posts: IPosts[] = [];
  categories: ICategory[] = [];
  constructor(
    private categoryService: CategoryService,
    private postService: PostsService
  ) {
    this.getAllCategories();
    this.getAllPosts();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categoriesData) => {
      this.categories = categoriesData.data;
      // console.log(this.categories);
    });
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe((allPosts) => {
      this.posts = allPosts.posts.docs;
    });
  }

  getPosts(id: string) {
    // console.log(id);
    this.categoryService.getCategoryPostId(id).subscribe((postList) => {
      console.log(postList);
      if (postList.data.posts) {
        this.posts = postList.data.posts;
      }
      this.isActive = !this.isActive;
      // posts
      // this.posts = posts.data.posts;
    });
  }
}

import { Component } from '@angular/core';
import { ICategory } from 'src/app/interfaces/Category';
import { IPosts } from 'src/app/interfaces/Posts';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent {
  posts!: IPosts[];
  categories: ICategory[] = [];
  constructor(private categoryService: CategoryService) {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categoriesData) => {
      this.categories = categoriesData.data;
      // console.log(this.categories);
    });
  }

  getPosts(id: string) {
    // console.log(id);
    this.categoryService.getCategoryPostId(id).subscribe((postList) => {
      console.log(postList);
      if (postList.data.posts) {
        this.posts = postList.data.posts;
        
      }
      
      
      // posts
      // this.posts = posts.data.posts;
    });
  }
}

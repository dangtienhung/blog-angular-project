import { Component } from '@angular/core';
import { ICategory } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent {
  categories: ICategory[] = [];
  constructor(private categoryService: CategoryService) {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categoriesData) => {
      this.categories = categoriesData.data;
      console.log(this.categories);
    });
  }

  getPosts() {
    
  }
}

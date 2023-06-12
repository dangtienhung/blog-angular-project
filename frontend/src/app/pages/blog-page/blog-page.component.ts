import { CategoryService } from 'src/app/services/category/category.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interfaces/Category';
import { IPosts } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss'],
})
export class BlogPageComponent {
  isActive = false;
  posts: IPosts[] = [];

  currentPage: number = 1;
  totalDocs!: number;
  totalPages!: number;
  totalPagesArray!: number[];
  hasNextPage: boolean = false;
  hasPrevPage: boolean = false;
  categories: ICategory[] = [];
  ishiddenPagination: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private postService: PostsService,
    private router: Router
  ) {
    this.getAllCategories();
    this.getAllPosts();
    // this.router.navigate(['/blog'], {
    //   queryParams: { page: this.currentPage },
    // });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categoriesData) => {
      this.categories = categoriesData.data;
      // console.log(this.categories);
    });
  }

  getAllPosts() {
    this.postService
      .getPostsApporved(this.currentPage)
      .subscribe((allPosts) => {
        this.posts = allPosts.posts.docs;

        this.currentPage = allPosts.posts.page;
        this.totalPages = allPosts.posts.totalPages;
        this.hasNextPage = allPosts.posts.hasNextPage;
        this.hasPrevPage = allPosts.posts.hasPrevPage;
        this.ishiddenPagination = false;

        this.totalPagesArray = Array(this.totalPages)
          .fill(0)
          .map((_, index) => index + 1);
        // console.log(this.totalPage);

        this.router.navigate(['/blog'], {
          queryParams: { page: this.currentPage },
        });
      });
  }

  getPosts(id: string) {
    // console.log(id);
    this.categoryService.getCategoryPostId(id).subscribe((postList) => {
      console.log(postList);
      if (postList.data.posts) {
        this.posts = postList.data.posts;
        this.ishiddenPagination = true;
        this.router.navigate(['/blog']);
      }
      this.isActive = !this.isActive;
      // posts
      // this.posts = posts.data.posts;
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.getAllPosts();
  }

  prevPage() {
    if (this.hasPrevPage) {
      this.currentPage--;
      this.getAllPosts();
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.getAllPosts();
    }
  }
}

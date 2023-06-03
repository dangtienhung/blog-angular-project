import { Component } from '@angular/core';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { IPosts } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.scss'],
})
export class ManagePostsComponent {
  title: string = 'Quản lý các bài đăng';
  linkActive: string = '/admin/post-add';
  theadTable: string[] = [
    'STT',
    'Tên bài đăng',
    'Tác giả',
    'Danh mục',
    'Hình ảnh',
    'Trạng thái',
    'Tags',
    'Lượt thích',
    'Action',
  ];
  PostsList: IPosts[] = [];
  Post!: IPosts;
  constructor(
    private postsService: PostsService,
    private excelServices: ExcelServiceService,
    private toastr: ToastrService
  ) {
    this.getAllPost();
  }

  getAllPost() {
    this.postsService.getAllPosts().subscribe((postsData) => {
      // console.log(postsData.posts.docs);
      this.PostsList = postsData.posts.docs;
    });
  }

  // get post by id
  handleGetPost(id: number | string) {
    this.postsService.getPost(id).subscribe(
      (data) => {
        this.Post = data.post;
        // console.log(data);
      },
      () => {
        this.toastr.error('Not found this post!');
      }
    );
  }

  /* handle delete post */
  handleDeletePost(id: string) {
    console.log(id);
    this.postsService.deleteFakePost(id).subscribe(
      () => {
        this.getAllPost();
      },
      (err) => console.log(err.message)
    );
  }
  /* export to excel */
  exportToExcel() {
    this.excelServices.exportToExcel(this.PostsList, 'Posts');
  }
}

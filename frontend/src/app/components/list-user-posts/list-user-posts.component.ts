import { Component, Input } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { HashtagsService } from 'src/app/services/hashtags/hashtags.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ICategory } from 'src/app/interfaces/Category';
import { ImagePreview } from 'src/app/interfaces/Image';
import { MyUploadAdapter } from 'src/app/modules/posts/myuploadAdapter';
import { IUser, IUserRegister, IUserRequest } from 'src/app/interfaces/User';

@Component({
  selector: 'app-list-user-posts',
  templateUrl: './list-user-posts.component.html',
  styleUrls: ['./list-user-posts.component.scss'],
})
export class ListUserPostsComponent {
  @Input() listUserPosts!: IPosts[];
  @Input() user!: IUserRequest;
  @Input() userLocal!: IUser;
  tempFile!: any;
  isUpload: boolean = false;
  // postData!: IPosts;
  public Editor = ClassicEditor;
  public editorContent = '';

  categories!: ICategory[];
  hashTagLists!: string[];
  urlImage: any[] = [];
  idPost!: string;

  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    content: ['', [Validators.required]],
    hashTags: [''],
    images: [['']],
    author: [''],
    category: ['', [Validators.required]],
    is_active: ['public', [Validators.required]],
    status: ['pending'],
  });

  constructor(
    private postsService: PostsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private imageService: UploadImageService,
    private http: HttpClient,
    private redirect: Router,
    private categoryService: CategoryService,
    private hashTagService: HashtagsService
  ) {
    this.getAllCategories();
    this.getAllHashTag();
  }

  handleDeletePost(id: string) {
    Swal.fire({
      title: 'Are you sure want to remove?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.postsService.deleteFakePost(id).subscribe(
          (data) => {
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            ).then(() => {
              this.listUserPosts = this.listUserPosts.filter(
                (item) => item._id !== id
              );
              this.toastr.success('Deleted✔');
            });
          },
          () => {
            Swal.fire('Error', 'Something went wrong 😥', 'error');
            this.toastr.error('Delete failed.');
          }
        );
      }
    });
  }

  onEditorReady(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new MyUploadAdapter(loader, this.http);
    };
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    this.isUpload = true;
    this.imageService.uploadImage(files).subscribe((res) => {
      this.urlImage = res.urls;
      // console.log(this.urlImage);
      this.toastr.success('Uploaded');
      this.isUpload = false;
    });
  }
  handleRemoveImage(public_id: string) {
    // console.log(public_id);
    if (!public_id) return;
    this.imageService.deleteImage(public_id).subscribe(() => {
      this.urlImage = this.urlImage.filter(
        (image) => image.public_id !== public_id
      );
      this.toastr.success('Xóa thành công.Hãy chọn 1 ảnh nền mới.');
    });
  }

  handleGetPostById(id: string) {
    this.postsService.getPostById(id).subscribe(
      ({ post }) => {
        this.urlImage = post.images;
        this.tempFile = post.images;
        this.idPost = post._id;
        // this.postData = post;
        this.postForm.patchValue({
          title: post.title,
          content: post.content,
          category: post.category._id,
          is_active: post.is_active ? 'public' : 'private',
          status: post.status,
          author: post.author._id,
          // hashTags: post.tags,
        });
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(({ data }) => {
      // console.log(data);
      this.categories = data;
      // console.log(this.categories);
    });
  }

  getAllHashTag() {
    this.hashTagService.getAllHashTags().subscribe((tags) => {
      this.hashTagLists = tags.data.map((tag) => tag.title);
    });
  }
  onHandleSubmit() {
    if (this.postForm.invalid) return;
    /* lấy ra thông tin người dùng */
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user) {
      this.toastr.error('Bạn chưa đăng nhập');
      return;
    }
    if (this.urlImage.length === 0) {
      this.toastr.warning('Bài post cần có ảnh nền!');
      return;
    }

    const post = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      category: this.postForm.value.category,
      images: this.urlImage.length <= 0 ? this.tempFile : this.urlImage,
      author: this.postForm.value.author,
      is_active: this.postForm.value.is_active === 'public' ? true : false,
      status: this.postForm.value.status,
    };

    // console.log(this.idPost);

    this.postsService.updatePost(post, this.idPost).subscribe(
      (data) => {
        // console.log(data);
        this.postsService.getPostByIdUser(user._id).subscribe(({ data }) => {
          if (data.postList) {
            this.listUserPosts = data.postList;
          }
        });

        this.postForm.reset();
        this.toastr.success('Chỉnh sửa thành công.');
      },
      () => {
        this.toastr.error('Chỉnh sửa thất bại');
      }
    );
  }
}

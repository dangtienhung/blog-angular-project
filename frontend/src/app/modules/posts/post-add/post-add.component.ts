import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { CategoryService } from './../../../services/category/category.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component } from '@angular/core';
import { HashtagsService } from './../../../services/hashtags/hashtags.service';
import { HttpClient } from '@angular/common/http';
import { ICategory } from 'src/app/interfaces/Category';
import { PostsService } from './../../../services/posts/posts.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UploadImageService } from './../../../services/uploadImage/upload-image.service';
import { MyUploadAdapter } from '../myuploadAdapter';
import { ImagePreview } from 'src/app/interfaces/Image';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent {
  hashTags = new FormControl('');
  hashTagLists: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  postForm = this.builder.group({
    // title: ['', [Validators.required, Validators.minLength(5)]],
    // content: ['', [Validators.required]],
    // author: ['', [Validators.required]],
    // category: ['', [Validators.required]],
    // status: ['public', [Validators.required]],
    // tags: [[], [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(4)]],
    content: ['', [Validators.required]],
    hashTags: [''],
    images: [[''], [Validators.required]],
    author: [''],
    category: ['', [Validators.required]],
    is_active: ['public', [Validators.required]],
    status: ['pending', [Validators.required]],
  });
  categories: ICategory[] = [];
  public Editor = ClassicEditor;
  public editorContent = '';
  imagePreviews: ImagePreview[] = [];
  nextImageId = 0;
  urls: any[] = [];
  constructor(
    private postsService: PostsService,
    private router: Router,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private uploadImageService: UploadImageService,
    private http: HttpClient,
    private categoryService: CategoryService,
    private hashtagsService: HashtagsService
  ) {
    this.getAllCategories();
    this.getAllTags();
  }
  /* get data */
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories.data;
    });
  }
  getAllTags() {
    this.hashtagsService.getAllHashTags().subscribe((tags) => {
      this.hashTagLists = tags.data.map((tag) => tag.title);
    });
  }
  handleFileInput(event: any): void {
    const files = event.target.files;
    /* update image to nodejs */
    this.uploadImageService.uploadImage(files).subscribe(
      (res) => {
        this.urls = res.urls;
        this.imagePreviews = res.urls; /* preview image */
      },
      () => {
        this.toastr.error('Tải hình ảnh lên thất bại');
      }
    );
  }
  handleRemoveImage(public_id: string) {
    if (!public_id) return;
    this.uploadImageService.deleteImage(public_id).subscribe(() => {
      this.imagePreviews = this.imagePreviews.filter(
        (image) => image.public_id !== public_id
      );
    });
  }
  handleSubmitPostForm() {
    if (this.postForm.invalid) return;
    /* lấy ra thông tin người dùng */
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user) {
      this.toastr.error('Bạn chưa đăng nhập');
      return;
    }
    /* lấy ra thông tin người dùng */
    const userId = user._id;
    const post = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      category: this.postForm.value.category,
      images: this.urls,
      author: userId,
      is_active:
        this.postForm.value.is_active === '' ||
        this.postForm.value.is_active === 'public'
          ? true
          : false,
      status: this.postForm.value.status,
    };
    // console.log(this.postForm.value.content);

    this.postsService.createPost(post).subscribe(
      () => {
        this.toastr.success('Đăng bài thành công');
        this.router.navigate(['/admin/manager-posts']);
        this.postForm.reset();
      },
      () => {
        this.toastr.error('Đăng bài thất bại');
      }
    );
  }

  onEditorReady = (editor: any) => {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new MyUploadAdapter(loader, this.http);
    };
  };
}

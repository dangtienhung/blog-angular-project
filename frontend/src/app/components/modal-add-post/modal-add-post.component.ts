import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { MyUploadAdapter } from 'src/app/modules/posts/myuploadAdapter';
import { CategoryService } from 'src/app/services/category/category.service';
import { ICategory } from 'src/app/interfaces/Category';
import { HashtagsService } from 'src/app/services/hashtags/hashtags.service';
import { ImagePreview } from 'src/app/interfaces/Image';
import { Router } from '@angular/router';
import { IPosts } from 'src/app/interfaces/Posts';
@Component({
  selector: 'app-modal-add-post',
  templateUrl: './modal-add-post.component.html',
  styleUrls: ['./modal-add-post.component.scss'],
})
export class ModalAddPostComponent {
  @Input() listUserPosts!: IPosts[];
  public Editor = ClassicEditor;
  public editorContent = '';

  categories!: ICategory[];
  hashTagLists!: string[];

  urlImage: any[] = [];

  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    content: ['', [Validators.required]],
    hashTags: [''],
    images: [[''], [Validators.required]],
    author: [''],
    category: ['', [Validators.required]],
    is_active: ['public', [Validators.required]],
    status: ['pending'],
  });

  constructor(
    private postService: PostsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private imageService: UploadImageService,
    private http: HttpClient,
    private redirect: Router,
    private categoryService: CategoryService,
    private hashTagService: HashtagsService
  ) {
    this.getAllCategories();
    this.getAllHashTag();
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
    this.imageService.uploadImage(files).subscribe(
      (res) => {
        this.urlImage = res.urls;
        // console.log(this.urlImage);
        this.toastr.success('Uploaded');
      },
      () => {
        this.toastr.error('Upload image failed. Please try again!');
      }
    );
  }

  handleRemoveImage(public_id: string) {
    // console.log(public_id);
    if (!public_id) return;
    this.imageService.deleteImage(public_id).subscribe(() => {
      this.urlImage = this.urlImage.filter(
        (image) => image.public_id !== public_id
      );
    });
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
    if (user.role === 'admin') {
      this.postForm.patchValue({
        status: 'approved',
      });
    }
    const post = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      category: this.postForm.value.category,
      images: this.urlImage,
      author: user._id,
      is_active:
        this.postForm.value.is_active === '' ||
        this.postForm.value.is_active === 'public'
          ? true
          : false,
      status: this.postForm.value.status,
    };

    this.postService.createPost(post).subscribe(
      ({ post }) => {
        post.author = user;
        // console.log(post);
        this.listUserPosts.push(post);
        // console.log(this.listUserPosts);

        user.role === 'admin'
          ? this.toastr.success('Đăng bài thành công.')
          : this.toastr.success(
              'Đăng bài thành công.Vui lòng chờ admin xét duyệt.'
            );
        this.postForm.reset();
        this.urlImage = [];
        this.redirect.navigate([`/user-info/${user._id}`]);
      },
      () => {
        this.toastr.error('Đăng bài thất bại.');
      }
    );
  }
}

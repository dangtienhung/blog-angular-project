import { Component, Input } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';
import { PostsService } from 'src/app/services/posts/posts.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-user-posts',
  templateUrl: './list-user-posts.component.html',
  styleUrls: ['./list-user-posts.component.scss'],
})
export class ListUserPostsComponent {
  @Input() listUserPosts!: IPosts[];

  constructor(
    private postsService: PostsService,
    private toastr: ToastrService
  ) {}

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
    return;
  }
}

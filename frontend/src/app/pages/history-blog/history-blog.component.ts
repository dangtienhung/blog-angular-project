import { Component } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';
import { IUser } from 'src/app/interfaces/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-history-blog',
  templateUrl: './history-blog.component.html',
  styleUrls: ['./history-blog.component.scss'],
})
export class HistoryBlogComponent {
  posts!: IPosts[];
  constructor(private postService: PostsService, private auth: AuthService) {
    const user = this.auth.getUserLogin();
    const id = user._id;
    this.postService.getPostByIdUser(id).subscribe((postList) => {
      if (postList.data.postList) {
        this.posts = postList.data.postList;
        console.log(this.posts);
        
      }
    });
  }
}

import { Component, Input } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';

@Component({
  selector: 'app-content-detail-posts',
  templateUrl: './content-detail-posts.component.html',
  styleUrls: ['./content-detail-posts.component.scss'],
})
export class ContentDetailPostsComponent {
  @Input() post!: IPosts;
}

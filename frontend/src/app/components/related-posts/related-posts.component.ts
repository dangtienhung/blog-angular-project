import { Component, Input } from '@angular/core';
import { IPosts } from 'src/app/interfaces/Posts';

@Component({
  selector: 'app-related-posts',
  templateUrl: './related-posts.component.html',
  styleUrls: ['./related-posts.component.scss'],
})
export class RelatedPostsComponent {
  @Input() relatedPosts!: IPosts[];
}

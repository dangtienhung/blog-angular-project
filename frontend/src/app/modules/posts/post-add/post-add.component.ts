import { FormBuilder, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { PostsService } from './../../../services/posts/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent {
  postForm = this.builder.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    content: ['', [Validators.required]],
    author: ['', [Validators.required]],
    category: ['', [Validators.required]],
    status: ['public', [Validators.required]],
    tags: [[], [Validators.required]],
  });
  constructor(
    private postsService: PostsService,
    private router: Router,
    private builder: FormBuilder
  ) {}
}

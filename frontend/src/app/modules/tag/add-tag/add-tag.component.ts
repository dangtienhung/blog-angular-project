import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITag } from 'src/app/interfaces/ITag';
import { TagsService } from 'src/app/services/tags/tags.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss'],
})
export class AddTagComponent {
  constructor(
    private tagService: TagsService,
    private fb: FormBuilder,
    private direct: Router
  ) {}

  addTag = this.fb.group({
    title: ['', [Validators.required]],
    slug: ['', [Validators.required]],
  });

  get checkTitle() {
    return this.addTag.get('title') as FormControl;
  }

  get checkSlug() {
    return this.addTag.get('slug') as FormControl;
  }

  handleAddNewTag() {
    const tag: ITag = {
      title: this.addTag.value.title || '',
      slug: this.addTag.value.slug || '',
    };
    this.tagService
      .createTag(tag)
      .subscribe(() => this.direct.navigateByUrl('/admin/manager-tags'));
  }
}

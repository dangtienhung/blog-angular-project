import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ITag } from 'src/app/interfaces/ITag';
import { TagsService } from 'src/app/services/tags/tags.service';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss'],
})
export class EditTagComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private tagService: TagsService,
    private router: ActivatedRoute,
    private direct: Router
  ) {}

  id = this.router.snapshot.params['id'];
  ngOnInit(): void {
    this.tagService.getTag(this.id).subscribe((data) => {
      this.editTag.patchValue({
        title: data.data[0].title,
        slug: data.data[0].slug,
      });
    });
  }

  editTag = new FormGroup({
    title: new FormControl('', [Validators.required]) as FormControl<string>,
    slug: new FormControl('', [Validators.required]) as FormControl<string>,
  });

  get checkTitle() {
    return this.editTag.get('title') as FormControl;
  }

  get checkSlug() {
    return this.editTag.get('slug') as FormControl;
  }

  handleEditTag() {
    const dataTag: ITag = this.editTag.getRawValue();
    this.tagService
      .updateTag(this.id, dataTag)
      .subscribe(() => this.direct.navigateByUrl('/admin/manager-tags'));
  }
}

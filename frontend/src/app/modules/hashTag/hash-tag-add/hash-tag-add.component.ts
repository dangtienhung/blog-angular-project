import { FormBuilder, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { HashtagsService } from 'src/app/services/hashtags/hashtags.service';
import { IHashTags } from 'src/app/interfaces/Tags';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hash-tag-add',
  templateUrl: './hash-tag-add.component.html',
  styleUrls: ['./hash-tag-add.component.scss'],
})
export class HashTagAddComponent {
  addForm = this.builder.group({
    title: ['', [Validators.required]],
  });
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private hashtagsService: HashtagsService,
    private toastr: ToastrService
  ) {}
  /* handle add new hashtag */
  handleAddNewHashTag() {
    if (this.addForm.invalid) return;
    const hashtag: IHashTags = {
      title: this.addForm.value.title || '',
    };
    this.hashtagsService.createHashTag(hashtag).subscribe(
      () => {
        this.toastr.success('Thêm thành công');
        this.router.navigate(['/admin/manager-tags']);
      },
      () => {
        this.toastr.error('Thêm thất bại');
      }
    );
  }
}

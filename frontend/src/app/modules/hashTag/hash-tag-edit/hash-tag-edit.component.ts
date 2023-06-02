import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { HashtagsService } from 'src/app/services/hashtags/hashtags.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hash-tag-edit',
  templateUrl: './hash-tag-edit.component.html',
  styleUrls: ['./hash-tag-edit.component.scss'],
})
export class HashTagEditComponent {
  editForm = this.builder.group({
    title: ['', [Validators.required]],
  });
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private hashtagsService: HashtagsService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.hashtagsService.getOneHashTag(id).subscribe((res) => {
          this.editForm.patchValue({
            title: res.data.title || '',
          });
        });
      }
    });
  }
  /* edit */
  handleSubmitEditForm() {
    if (this.editForm.invalid) {
      return;
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const hashTag = {
        title: this.editForm.value.title || '',
      };
      this.hashtagsService.updateHashTag(id, hashTag).subscribe(
        () => {
          this.toastr.success('Cập nhật thành công');
          this.router.navigate(['/admin/manager-tags']);
        },
        () => {
          this.toastr.error('Cập nhật thất bại');
        }
      );
    }
  }
}

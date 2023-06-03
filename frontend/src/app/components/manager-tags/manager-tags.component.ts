import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITag, ITagDocs } from 'src/app/interfaces/ITag';
import { TagsService } from 'src/app/services/tags/tags.service';

@Component({
  selector: 'app-manager-tags',
  templateUrl: './manager-tags.component.html',
  styleUrls: ['./manager-tags.component.scss'],
})
export class ManagerTagsComponent implements OnInit {
  title: string = 'Quản lý Tag bài viết';
  titleModal: string = 'Thêm Tag bài viết';
  theadTable: string[] = ['STT', 'Title', 'Slug', 'Action'];
  tagList: ITag[] = [];
  routerLink = '/admin/hash-tags-add';
  constructor(private tagService: TagsService, private fb: FormBuilder) {}
  tagForm = this.fb.group({
    title: ['', [Validators.required]],
    slug: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags() {
    this.tagService.getAllTags().subscribe((data) => {
      this.tagList = data.data;
    });
  }

  deleteTag(id: string) {
    this.tagService.deleteTag(id).subscribe(() => this.getAllTags());
  }

  editTag(id: string) {
    this.tagService.deleteTag(id).subscribe((data) => console.log(data));
  }
}

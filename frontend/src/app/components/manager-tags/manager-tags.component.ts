<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITag, ITagDocs } from 'src/app/interfaces/ITag';
import { TagsService } from 'src/app/services/tags/tags.service';
=======
import { Component } from '@angular/core';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { HashtagsService } from 'src/app/services/hashtags/hashtags.service';
import { IHashTags } from 'src/app/interfaces/Tags';
>>>>>>> 5c681f5e10a1d0aa687939d396ec386ca1ed75a7

@Component({
  selector: 'app-manager-tags',
  templateUrl: './manager-tags.component.html',
  styleUrls: ['./manager-tags.component.scss'],
})
<<<<<<< HEAD
export class ManagerTagsComponent implements OnInit {
  title: string = 'Quản lý Tag bài viết';
  titleModal: string = 'Thêm Tag bài viết';
  theadTable: string[] = ['STT', 'Title', 'Slug', 'Action'];
  tagList: ITag[] = [];
  routerLink = '/admin/add-tag';
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
=======
export class ManagerTagsComponent {
  hashTags: IHashTags[] = [];
  title: string = 'Quản lý các tags';
  theadTable: string[] = ['STT', 'Tên tag', 'Slug', 'Action'];
  linkActive: string = '/admin/hash-tags-add';
  constructor(
    private hashTagsService: HashtagsService,
    private excelServices: ExcelServiceService
  ) {
    this.getAllHashTags();
  }
  // getAllHashTags
  getAllHashTags() {
    this.hashTagsService.getAllHashTags().subscribe((hashTags) => {
      this.hashTags = hashTags.data;
    });
  }
  /* deleteHashtag */
  deleteHashTag(id: string) {
    this.hashTagsService.deleteHashTag(id).subscribe(() => {
      this.getAllHashTags();
    });
  }
  /* export to excel */
  exportToExcel() {
    this.excelServices.exportToExcel(this.hashTags, 'HashTags');
>>>>>>> 5c681f5e10a1d0aa687939d396ec386ca1ed75a7
  }
}

import { Component } from '@angular/core';
import { ExcelServiceService } from 'src/app/services/excelService/excel-service.service';
import { HashtagsService } from 'src/app/services/hashtags/hashtags.service';
import { IHashTags } from 'src/app/interfaces/Tags';

@Component({
  selector: 'app-manager-tags',
  templateUrl: './manager-tags.component.html',
  styleUrls: ['./manager-tags.component.scss'],
})
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
  }
}

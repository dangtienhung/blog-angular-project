import { Component, Input } from '@angular/core';

import { IPosts } from 'src/app/interfaces/Posts';
import { handleFomatDate } from 'src/app/utils/fomatDate';

@Component({
  selector: 'app-content-detail-posts',
  templateUrl: './content-detail-posts.component.html',
  styleUrls: ['./content-detail-posts.component.scss'],
})
export class ContentDetailPostsComponent {
  @Input() post!: IPosts;
  dateFomat: string = '';

  handleFomatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript tính từ 0 - 11, nên cần cộng 1
    const year = date.getFullYear();
    // Định dạng lại chuỗi ngày, tháng, năm
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}

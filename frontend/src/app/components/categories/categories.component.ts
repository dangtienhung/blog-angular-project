import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  title: string = 'Quản lý các danh mục';
  theadTable: string[] = ['STT', 'Tên danh mục', 'Slug', 'Action'];
  /* handle edit category */
  handleEditCategory(items: any) {
    console.log(
      '🚀 ~ file: categories.component.ts:14 ~ CategoriesComponent ~ handleEditCategory ~ items:',
      items
    );
  }
  /* handle delete user */
  handleDeleteCategory(id: string) {
    console.log(id);
  }
}

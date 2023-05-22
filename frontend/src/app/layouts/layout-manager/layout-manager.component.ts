import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-layout-manager',
  templateUrl: './layout-manager.component.html',
  styleUrls: ['./layout-manager.component.scss'],
})
export class LayoutManagerComponent {
  @Input() title: string = '';
  @Input() theadTable: string[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<any>();
  /* handle edit */
  handleEdit(items: any) {
    this.edit.emit(items);
  }
  /* handle delete */
  handleDelete(id: string) {
    this.delete.emit(id);
  }
}

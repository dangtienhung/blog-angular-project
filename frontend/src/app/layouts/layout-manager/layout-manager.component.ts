import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IUser } from 'src/app/interfaces/User';

@Component({
  selector: 'app-layout-manager',
  templateUrl: './layout-manager.component.html',
  styleUrls: ['./layout-manager.component.scss'],
})
export class LayoutManagerComponent {
  @Input() title: string = '';
  @Input() titleModal: string = '';
  @Input() theadTable: string[] = [];
  @Input() dataTbody: IUser[] = [];
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

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout-modal-admin',
  templateUrl: './layout-modal-admin.component.html',
  styleUrls: ['./layout-modal-admin.component.scss'],
})
export class LayoutModalAdminComponent {
  @Input() titleModal: string = '';
}

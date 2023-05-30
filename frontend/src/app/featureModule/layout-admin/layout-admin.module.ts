import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutAdminRoutingModule } from './layout-admin-routing.module';
import { LayoutAdminComponent } from './layout-admin.component';


@NgModule({
  declarations: [
    LayoutAdminComponent
  ],
  imports: [
    CommonModule,
    LayoutAdminRoutingModule
  ]
})
export class LayoutAdminModule { }

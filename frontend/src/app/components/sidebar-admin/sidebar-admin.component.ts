import { Component } from '@angular/core';
import { MenuItems } from 'src/app/interfaces/ISidebarAdmin';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss'],
})
export class SidebarAdminComponent {
  /* router link */
  menuItems: MenuItems[] = [
    {
      routerLink: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      isActive: true,
    },
    {
      routerLink: 'manager-users',
      label: 'Users',
      icon: 'fas fa-users',
      isActive: false,
    },
    {
      routerLink: 'manager-posts',
      label: 'Posts',
      icon: 'fa-solid fa-file',
      isActive: false,
    },
    {
      routerLink: 'manager-categories',
      label: 'Categories',
      icon: 'fa-solid fa-list',
      isActive: false,
    },
    {
      routerLink: 'manager-comments',
      label: 'Comments',
      icon: 'fa-solid fa-comments',
      isActive: false,
    },
  ];
  /* setActiveItem */
  setActiveItem(item: MenuItems) {
    this.menuItems.forEach((item) => {
      item.isActive = false;
    });
    item.isActive = true;
  }
}

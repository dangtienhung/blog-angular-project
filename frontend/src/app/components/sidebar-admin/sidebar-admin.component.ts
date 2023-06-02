import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItems } from 'src/app/interfaces/ISidebarAdmin';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss'],
})
export class SidebarAdminComponent {
  constructor(private service: AuthService, private direct: Router) {}
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
      routerLink: 'manager-tags',
      label: 'Tags',
      icon: 'fa-solid fa-tags',
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

  onLogout() {
    this.service.logOut();
    this.direct.navigateByUrl('login-admin');
  }
}

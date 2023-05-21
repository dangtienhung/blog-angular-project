import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManagerCommentsComponent } from './components/manager-comments/manager-comments.component';
import { ManagerTagsComponent } from './components/manager-tags/manager-tags.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: HomepageComponent },
    ],
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manager-users', component: ManageUserComponent },
      { path: 'manager-posts', component: ManagePostsComponent },
      { path: 'manager-categories', component: CategoriesComponent },
      { path: 'manager-tags', component: ManagerTagsComponent },
      { path: 'manager-comments', component: ManagerCommentsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

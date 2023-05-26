import { RouterModule, Routes } from '@angular/router';

import { AddUserComponent } from './modules/user/add-user/add-user.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManagerCommentsComponent } from './components/manager-comments/manager-comments.component';
import { ManagerTagsComponent } from './components/manager-tags/manager-tags.component';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostsDetailPageComponent } from './pages/posts-detail-page/posts-detail-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: HomepageComponent },
      { path: 'user-info', component: UserInfoComponent },
      { path: 'posts/:id', component: PostsDetailPageComponent },
    ],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'manager-users', component: ManageUserComponent },
      { path: 'manager-posts', component: ManagePostsComponent },
      { path: 'manager-categories', component: CategoriesComponent },
      { path: 'manager-tags', component: ManagerTagsComponent },
      { path: 'manager-comments', component: ManagerCommentsComponent },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

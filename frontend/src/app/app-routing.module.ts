import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { PostsDetailPageComponent } from './pages/posts-detail-page/posts-detail-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: HomepageComponent },
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

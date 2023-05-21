import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ManagerTagsComponent } from './components/manager-tags/manager-tags.component';
import { ManagerCommentsComponent } from './components/manager-comments/manager-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutClientComponent,
    LayoutAdminComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SidebarAdminComponent,
    ManageUserComponent,
    ManagePostsComponent,
    CategoriesComponent,
    ManagerTagsComponent,
    ManagerCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

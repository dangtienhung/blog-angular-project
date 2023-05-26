import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContentDetailPostsComponent } from './components/content-detail-posts/content-detail-posts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FeatureComponent } from './components/feature/feature.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { LayoutManagerComponent } from './layouts/layout-manager/layout-manager.component';
import { LayoutModalAdminComponent } from './layouts/layout-modal-admin/layout-modal-admin.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManagerCommentsComponent } from './components/manager-comments/manager-comments.component';
import { ManagerTagsComponent } from './components/manager-tags/manager-tags.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostsDetailPageComponent } from './pages/posts-detail-page/posts-detail-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RelatedPostsComponent } from './components/related-posts/related-posts.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SliderComponent } from './components/slider/slider.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { AddUserComponent } from './modules/user/add-user/add-user.component';

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
    ManagerCommentsComponent,
    LoginPageComponent,
    SignupPageComponent,
    LayoutManagerComponent,
    SliderComponent,
    FeatureComponent,
    NewPostComponent,
    PostsComponent,
    LayoutModalAdminComponent,
    UserInfoComponent,
    PageNotFoundComponent,
    PostsDetailPageComponent,
    RelatedPostsComponent,
    ContentDetailPostsComponent,
    NotFoundPageComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Image, ImageUpload } from '@ckeditor/ckeditor5-image';

import { AddCategoryComponent } from './modules/category/add-category/add-category.component';
import { AddTagComponent } from './modules/tag/add-tag/add-tag.component';
import { AddUserComponent } from './modules/user/add-user/add-user.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AvatarDirective } from './Directive/avatar.directive';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CategoriesComponent } from './components/categories/categories.component';
import { CommonModule } from '@angular/common';
import { ContentDetailPostsComponent } from './components/content-detail-posts/content-detail-posts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditCategoryComponent } from './modules/category/edit-category/edit-category.component';
import { EditTagComponent } from './modules/tag/edit-tag/edit-tag.component';
import { FeatureComponent } from './components/feature/feature.component';
import { FooterComponent } from './components/footer/footer.component';
import { HashTagAddComponent } from './modules/hashTag/hash-tag-add/hash-tag-add.component';
import { HashTagEditComponent } from './modules/hashTag/hash-tag-edit/hash-tag-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { LayoutClientComponent } from './layouts/layout-client/layout-client.component';
import { LayoutManagerComponent } from './layouts/layout-manager/layout-manager.component';
import { LayoutModalAdminComponent } from './layouts/layout-modal-admin/layout-modal-admin.component';
import { LoginPageAdminComponent } from './pages/login-page-admin/login-page-admin.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ManagePostsComponent } from './components/manage-posts/manage-posts.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManagerCommentsComponent } from './components/manager-comments/manager-comments.component';
import { ManagerTagsComponent } from './components/manager-tags/manager-tags.component';
import { ManagerTrashCanComponent } from './components/manager-trash-can/manager-trash-can.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { NewPostComponent } from './components/new-post/new-post.component';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PostAddComponent } from './modules/posts/post-add/post-add.component';
import { PostEditComponent } from './modules/posts/post-edit/post-edit.component';
import { PostListsComponent } from './pages/post-lists/post-lists.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostsDetailPageComponent } from './pages/posts-detail-page/posts-detail-page.component';
import { RelatedPostsComponent } from './components/related-posts/related-posts.component';
import { RequestInterceptor } from './request/request.interceptor';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SliderComponent } from './components/slider/slider.component';
import { ToastrModule } from 'ngx-toastr';
import { TrashCanPostComponent } from './modules/trash-can/trash-can-post/trash-can-post.component';
import { TrashCanUserComponent } from './modules/trash-can/trash-can-user/trash-can-user.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { PreviewComponent } from './components/preview/preview.component';
import { EditUserComponent } from './modules/user/edit-user/edit-user.component';

// import } from 'ngx-toastr'

// import { RequestInterceptor } from './request/request.interceptor';
// import { RequestInterceptor } from './request/request.interceptor';
// import { AddTagComponent } from './modules/tag/add-tag/add-tag.component';
// import { EditTagComponent } from './modules/tag/edit-tag/edit-tag.component';
// import { PostEditComponent } from './modules/posts/post-edit/post-edit.component';
import { ViewCommentComponent } from './components/manager-comments/view-comment/view-comment.component';

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
    LoginPageAdminComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    PostListsComponent,
    AvatarDirective,
    AddTagComponent,
    EditTagComponent,
    PostAddComponent,
    HashTagAddComponent,
    HashTagEditComponent,
    BlogPageComponent,
    PreviewComponent,
    EditUserComponent,
    PostEditComponent,
    ManagerTrashCanComponent,
    TrashCanPostComponent,
    TrashCanUserComponent,
    ViewCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    CKEditorModule,
    // Toi bi loi ToastrModule nay ko down dc ngx-toastr len phai comment lai!!

    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
    SlickCarouselModule,
    CKEditorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTabsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule {}

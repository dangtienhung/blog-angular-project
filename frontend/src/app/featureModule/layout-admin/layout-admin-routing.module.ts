import { RouterModule, Routes } from '@angular/router';

import { AddCategoryComponent } from 'src/app/modules/category/add-category/add-category.component';
import { AddUserComponent } from 'src/app/modules/user/add-user/add-user.component';
import { CategoriesComponent } from 'src/app/components/categories/categories.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { EditCategoryComponent } from 'src/app/modules/category/edit-category/edit-category.component';
import { HashTagAddComponent } from 'src/app/modules/hashTag/hash-tag-add/hash-tag-add.component';
import { HashTagEditComponent } from './../../modules/hashTag/hash-tag-edit/hash-tag-edit.component';
import { LayoutAdminComponent } from '../../layouts/layout-admin/layout-admin.component';
import { ManagePostsComponent } from 'src/app/components/manage-posts/manage-posts.component';
import { ManageUserComponent } from 'src/app/components/manage-user/manage-user.component';
import { ManagerCommentsComponent } from 'src/app/components/manager-comments/manager-comments.component';
import { ManagerTagsComponent } from 'src/app/components/manager-tags/manager-tags.component';
import { ManagerTrashCanComponent } from 'src/app/components/manager-trash-can/manager-trash-can.component';
import { NgModule } from '@angular/core';
import { PostAddComponent } from 'src/app/modules/posts/post-add/post-add.component';
import { EditUserComponent } from 'src/app/modules/user/edit-user/edit-user.component';

import { PostEditComponent } from 'src/app/modules/posts/post-edit/post-edit.component';
import { ViewCommentComponent } from 'src/app/components/manager-comments/view-comment/view-comment.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'manager-users', component: ManageUserComponent },
      { path: 'manager-posts', component: ManagePostsComponent },
      { path: 'post-add', component: PostAddComponent },
      { path: 'post-edit/:id', component: PostEditComponent },
      { path: 'manager-categories', component: CategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'edit-category/:id', component: EditCategoryComponent },
      { path: 'manager-tags', component: ManagerTagsComponent },
      {
        path: 'manager-comments',
        component: ManagerCommentsComponent,
      },
      {
        path: 'view-comment/:id',
        component: ViewCommentComponent,
      },
      { path: 'hash-tags-add', component: HashTagAddComponent },
      { path: 'hash-tags-edit/:id', component: HashTagEditComponent },
      { path: 'trash-can', component: ManagerTrashCanComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutAdminRoutingModule {}

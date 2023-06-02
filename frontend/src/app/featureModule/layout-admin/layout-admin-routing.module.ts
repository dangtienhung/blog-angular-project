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
<<<<<<< HEAD
import { AddTagComponent } from 'src/app/modules/tag/add-tag/add-tag.component';
import { EditTagComponent } from 'src/app/modules/tag/edit-tag/edit-tag.component';
import { AddPostComponent } from 'src/app/modules/post/add-post/add-post.component';
import { EditPostComponent } from 'src/app/modules/post/edit-post/edit-post.component';
=======
import { ManagerTagsComponent } from 'src/app/components/manager-tags/manager-tags.component';
import { NgModule } from '@angular/core';
import { PostAddComponent } from 'src/app/modules/posts/post-add/post-add.component';
>>>>>>> 5c681f5e10a1d0aa687939d396ec386ca1ed75a7

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
      { path: 'manager-users', component: ManageUserComponent },
      { path: 'manager-posts', component: ManagePostsComponent },
      { path: 'post-add', component: PostAddComponent },
      { path: 'manager-categories', component: CategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'edit-category/:id', component: EditCategoryComponent },
      { path: 'add-tag', component: AddTagComponent },
      { path: 'edit-tag/:id', component: EditTagComponent },
      { path: 'manager-tags', component: ManagerTagsComponent },
      { path: 'manager-comments', component: ManagerCommentsComponent },
<<<<<<< HEAD
      { path: 'add-post', component: AddPostComponent },
      { path: 'edit-post', component: EditPostComponent },
=======
      { path: 'hash-tags-add', component: HashTagAddComponent },
      { path: 'hash-tags-edit/:id', component: HashTagEditComponent },
>>>>>>> 5c681f5e10a1d0aa687939d396ec386ca1ed75a7
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutAdminRoutingModule {}

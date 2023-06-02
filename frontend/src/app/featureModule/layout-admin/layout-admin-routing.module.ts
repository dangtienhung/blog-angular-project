import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminComponent } from '../../layouts/layout-admin/layout-admin.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { AddUserComponent } from 'src/app/modules/user/add-user/add-user.component';
import { ManageUserComponent } from 'src/app/components/manage-user/manage-user.component';
import { ManagePostsComponent } from 'src/app/components/manage-posts/manage-posts.component';
import { CategoriesComponent } from 'src/app/components/categories/categories.component';
import { AddCategoryComponent } from 'src/app/modules/category/add-category/add-category.component';
import { EditCategoryComponent } from 'src/app/modules/category/edit-category/edit-category.component';
import { ManagerTagsComponent } from 'src/app/components/manager-tags/manager-tags.component';
import { ManagerCommentsComponent } from 'src/app/components/manager-comments/manager-comments.component';
import { AddTagComponent } from 'src/app/modules/tag/add-tag/add-tag.component';
import { EditTagComponent } from 'src/app/modules/tag/edit-tag/edit-tag.component';
import { AddPostComponent } from 'src/app/modules/post/add-post/add-post.component';
import { EditPostComponent } from 'src/app/modules/post/edit-post/edit-post.component';

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
      { path: 'manager-categories', component: CategoriesComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'edit-category/:id', component: EditCategoryComponent },
      { path: 'add-tag', component: AddTagComponent },
      { path: 'edit-tag/:id', component: EditTagComponent },
      { path: 'manager-tags', component: ManagerTagsComponent },
      { path: 'manager-comments', component: ManagerCommentsComponent },
      { path: 'add-post', component: AddPostComponent },
      { path: 'edit-post', component: EditPostComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutAdminRoutingModule {}

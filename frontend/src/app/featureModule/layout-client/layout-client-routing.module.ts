import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientComponent } from '../../layouts/layout-client/layout-client.component';
import { HomepageComponent } from '../../pages/homepage/homepage.component';
import { UserInfoComponent } from '../../pages/user-info/user-info.component';
import { PostsComponent } from '../../components/posts/posts.component';
import { BlogPageComponent } from 'src/app/pages/blog-page/blog-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'user-info',
        component: UserInfoComponent,
      },
      {
        path: 'post/:id',
        component: PostsComponent,
      },
      {
        path: 'blog',
        component: BlogPageComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutClientRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientComponent } from '../../layouts/layout-client/layout-client.component';
import { HomepageComponent } from '../../pages/homepage/homepage.component';
import { UserInfoComponent } from '../../pages/user-info/user-info.component';
import { PostsComponent } from '../../components/posts/posts.component';
import { PostsDetailPageComponent } from 'src/app/pages/posts-detail-page/posts-detail-page.component';
import { BlogPageComponent } from 'src/app/pages/blog-page/blog-page.component';
import { HistoryBlogComponent } from 'src/app/pages/history-blog/history-blog.component';

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
        path: 'user-info/:id',
        component: UserInfoComponent,
      },
      {
        path: 'posts/:id',
        component: PostsDetailPageComponent,
      },
      {
        path: 'blog',
        component: BlogPageComponent,
      },
      {
        path: 'history-blog',
        component: HistoryBlogComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutClientRoutingModule {}

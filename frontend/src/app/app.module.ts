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
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SliderComponent } from './components/slider/slider.component';
import { FeatureComponent } from './components/feature/feature.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostsDetailPageComponent } from './pages/posts-detail-page/posts-detail-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutClientComponent,
    LayoutAdminComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginPageComponent,
    SignupPageComponent,
    SliderComponent,
    FeatureComponent,
    NewPostComponent,
    PostsComponent,
    PostsDetailPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

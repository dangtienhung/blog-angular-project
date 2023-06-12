import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDocPosts, IPostAnalytics, IPosts } from 'src/app/interfaces/Posts';

import { IUser } from 'src/app/interfaces/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { baseURL } from 'src/app/utils/instance';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseURL: string = '';
  constructor(private http: HttpClient, private router: Router) {
    this.baseURL = `${baseURL}`;
  }
  getAccessToken() {
    const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
    // console.log(
    //   '🚀 ~ file: posts.service.ts:19 ~ PostsService ~ getAccessToken ~ accessToken:',
    //   accessToken
    // );
    if (!accessToken || accessToken === '') {
      this.router.navigate(['/login-admin']);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    const options = { headers: headers };
    return options;
  }
  getAllPosts(page: number | string = 1): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(`${baseURL}/posts?_page=${page}`);
  }
  getPostsApporved(page: number | string = 1): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(`${baseURL}/posts/approved?_page=${page}`);
  }
  getPost(id: number | string): Observable<any> {
    return this.http.get<any>(`${baseURL}/posts/${id}`);
  }
  deleteFakePost(id: number | string) {
    return this.http.put(`${baseURL}/posts/delete-fake/${id}`, {
      deleted: true,
    });
  }
  createPost(post: any): Observable<any> {
    // const options = this.getAccessToken();
    return this.http.post(`${baseURL}/posts`, post);
  }

  updatePost(post: any, id: string): Observable<any> {
    // const options = this.getAccessToken();
    return this.http.put(`${baseURL}/posts/${id}`, post);
  }

  /* get post by id */
  getPostById(id: string): Observable<{ message: string; post: IPosts }> {
    return this.http.get<{ message: string; post: IPosts }>(
      `${this.baseURL}/posts/${id}`
    );
  }

  /* get posts by id user */
  getPostByIdUser(id: string): Observable<{ message: string; data: IUser }> {
    return this.http.get<{ message: string; data: IUser }>(
      `${this.baseURL}/users/posts/all/${id}`
    );
  }

  /*Search posts by title */
  searchPost(keyword: string): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(`${baseURL}/posts/approved?q=${keyword}`);
  }
  /* get post with delete: true */
  getPostDeleted(): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(
      `${baseURL}/posts/deleted/all?_limit=10&_page=1`
    );
  }
  /* undo delete post */
  undoDeletePost(id: string): Observable<IPosts> {
    return this.http.put<IPosts>(`${this.baseURL}/posts/restore/${id}`, {});
  }
  /* delete post */
  deletePost(id: string): Observable<IPosts> {
    return this.http.delete<IPosts>(`${this.baseURL}/posts/${id}`);
  }
  /* lấy số liệu người dùng được tạo ra trong 1 ngày/ 1 tuần */
  getPostByDate(): Observable<IPostAnalytics[]> {
    return this.http.get<IPostAnalytics[]>(
      `${this.baseURL}/posts/counter/post-new`
    );
  }
  /* lấy ra các bài viết trạng thái pending */
  getPostPending(): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(`${this.baseURL}/posts/pending/all`);
  }
  /* update status approved */
  updateApprovedPost(id: string): Observable<IPosts> {
    return this.http.put<IPosts>(`${this.baseURL}/posts/approved/${id}`, {});
  }
  /* update status pending */
  updatePendingPost(id: string): Observable<IPosts> {
    return this.http.put<IPosts>(`${this.baseURL}/posts/pending/${id}`, {});
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDocPosts, IPosts } from 'src/app/interfaces/Posts';

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
    console.log(
      '🚀 ~ file: posts.service.ts:19 ~ PostsService ~ getAccessToken ~ accessToken:',
      accessToken
    );
    if (!accessToken || accessToken === '') {
      this.router.navigate(['/login-admin']);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    const options = { headers: headers };
    return options;
  }
  getAllPosts(): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(`${baseURL}/posts`);
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
    const options = this.getAccessToken();
    return this.http.post(`${baseURL}/posts`, post, options);
  }
  /* get post by id */
  getPostById(id: string): Observable<{ message: string; post: IPosts }> {
    return this.http.get<{ message: string; post: IPosts }>(
      `${this.baseURL}/posts/${id}`
    );
  }

  /*Search posts by title */
  searchPost(keyword: string): Observable<IPosts[]> {
    return this.http.get<IPosts[]>(`${baseURL}/posts?q=${keyword}`);
  }
}

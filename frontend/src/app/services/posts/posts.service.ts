import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDocPosts, IPosts } from 'src/app/interfaces/Posts';
import { baseURL } from 'src/app/utils/instance';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseURL: string = '';
  constructor(private http: HttpClient) {
    this.baseURL = `${baseURL}`;
  }

  getAllPosts(): Observable<IDocPosts> {
    return this.http.get<IDocPosts>(`${baseURL}/posts`);
  }
  deleteFakePost(id: number | string) {
    return this.http.put(`${baseURL}/posts/delete-fake/${id}`, {
      deleted: true,
    });
  }
}

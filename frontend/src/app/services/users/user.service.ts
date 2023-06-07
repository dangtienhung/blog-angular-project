import {
  IUser,
  IUserDocs,
  IUserPosts,
  IUserRequest,
  IUserResponse,
} from 'src/app/interfaces/User';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/app/utils/instance';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = '';
  constructor(private http: HttpClient) {
    this.baseURL = `${baseURL}/users`;
  }

  /* getAllUsers */
  getAllUsers(): Observable<IUserDocs> {
    return this.http.get<IUserDocs>(`${this.baseURL}?_page=1&&_limit=10`);
  }

  /* getAllUserDeleted */
  getAllUserDeleted(): Observable<Omit<IUserDocs, 'postList'>> {
    return this.http.get<Omit<IUserDocs, 'postList'>>(
      `${this.baseURL}/deleted/all?_page=1&&_limit=10`
    );
  }

  getUser(id: string): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`${this.baseURL}/${id}`);
  }
  /* create */
  createUser(user: IUserRequest) {
    return this.http.post(`${this.baseURL}/create`, user);
  }
  /* update */
  updateUser(id: string | undefined, user: IUserRequest) {
    return this.http.put<any>(`${this.baseURL}/${id}`, user);
  }
  /* delete fake */
  deleteUserFake(id: string) {
    return this.http.put(`${this.baseURL}/delete-fake/${id}`, {
      deleted: true,
    });
  }
  /* restore */
  restoreUser(id: string) {
    return this.http.put(`${this.baseURL}/restore/${id}`, {
      deleted: false,
    });
  }
  /* delete real */
  deleteUserReal(id: string) {
    return this.http.delete(`${this.baseURL}/delete/${id}`);
  }

  /*get list user posts */
  getUserPosts(id: string) {
    return this.http.get<IUserPosts>(`${this.baseURL}/posts/all/${id}`);
  }
}

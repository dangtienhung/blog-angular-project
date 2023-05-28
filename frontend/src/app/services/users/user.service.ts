import { IUser, IUserDocs, IUserRegister } from 'src/app/interfaces/User';

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
  /* create */
  createUser(user: IUser) {
    return this.http.post(`${this.baseURL}`, user);
  }
  /* update */
  updateUser(user: IUser) {
    return this.http.put(`${this.baseURL}/${user._id}`, user);
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
}

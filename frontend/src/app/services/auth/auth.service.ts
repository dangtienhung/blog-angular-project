import { ILogin, IUserResponse } from 'src/app/interfaces/User';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from './../../utils/instance';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  TOKEN_KEY = 'authToken';
  TOKEN_USER = 'user';
  baseURL: string = '/api/v1/sign-in';
  constructor(private http: HttpClient) {}
  /* login */
  loginUser(userInfo: ILogin): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${this.baseURL}`, userInfo);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

  hasPermission(role: string) {
    const user = JSON.parse(localStorage.getItem(this.TOKEN_USER)!);
    return role == user.role ? true : false;
  }
}

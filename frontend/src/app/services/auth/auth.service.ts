import { IUser, IUserResponse } from 'src/app/interfaces/User';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from './../../utils/instance';

interface ILogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = '';
  constructor(private http: HttpClient) {
    this.baseURL = `${baseURL}/sign-in`;
  }
  /* login */
  loginUser(userInfo: ILogin): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(`${this.baseURL}`, userInfo);
  }
}

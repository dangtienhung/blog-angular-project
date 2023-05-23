import { HttpClient } from '@angular/common/http';
import { IUserDocs } from 'src/app/interfaces/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = '';
  constructor(private http: HttpClient) {
    this.baseURL = 'http://localhost:8080/api/v1/users';
  }
  /* getAllUsers */
  getAllUsers(): Observable<IUserDocs> {
    return this.http.get<IUserDocs>(`${this.baseURL}`);
  }
}

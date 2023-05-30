import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDocHashTags, IHashTags } from 'src/app/interfaces/Tags';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { baseURL } from 'src/app/utils/instance';

@Injectable({
  providedIn: 'root',
})
export class HashtagsService {
  baseURL = '';
  constructor(private http: HttpClient, private router: Router) {
    this.baseURL = `${baseURL}/tag`;
  }
  getAccessToken() {
    const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
    if (!accessToken || accessToken === '') {
      this.router.navigate(['/login-admin']);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    const options = { headers: headers };
    return options;
  }
  /* create tag */
  createHashTag(data: IHashTags): Observable<IHashTags> {
    const options = this.getAccessToken();
    return this.http.post<IHashTags>(`${this.baseURL}`, data, options);
  }
  /* get all */
  getAllHashTags(): Observable<IDocHashTags> {
    return this.http.get<IDocHashTags>(`${this.baseURL}`);
  }
  /* get one */
  getOneHashTag(id: string): Observable<{ message: string; data: IHashTags }> {
    return this.http.get<{ message: string; data: IHashTags }>(
      `${this.baseURL}/${id}`
    );
  }
  /* update */
  updateHashTag(id: string, data: IHashTags): Observable<IHashTags> {
    const options = this.getAccessToken();
    return this.http.put<IHashTags>(`${this.baseURL}/${id}`, data, options);
  }
  /* delete */
  deleteHashTag(id: string): Observable<IHashTags> {
    const options = this.getAccessToken();
    return this.http.delete<IHashTags>(`${this.baseURL}/${id}`, options);
  }
}

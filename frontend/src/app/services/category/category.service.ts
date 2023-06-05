import { HttpClient } from '@angular/common/http';
import { ICategory, IDocCategories } from 'src/app/interfaces/Category';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/app/utils/instance';
import { IPosts } from 'src/app/interfaces/Posts';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  //Proxy rest_api at file proxy.conf.json
  baseURL: string = '';
  categories: ICategory[] = [];
  constructor(private http: HttpClient, private router: Router) {
    this.baseURL = `${baseURL}/category`;
  }
  // getAccessToken() {
  //   const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
  //   if (!accessToken || accessToken === '') {
  //     this.router.navigate(['/login-admin']);
  //   }
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${accessToken}`,
  //   });
  //   const options = { headers: headers };
  //   return options;
  // }
  // baseURL: string = `${baseURL}/category`;
  // categories: ICategory[] = [];
  // constructor(private http: HttpClient) {}
  /* getAllCategories */
  getAllCategories(): Observable<IDocCategories> {
    return this.http.get<IDocCategories>(this.baseURL);
  }
  /* add new category */
  addNewCategory(category: ICategory): Observable<ICategory> {
    // const options = this.getAccessToken();
    return this.http.post<ICategory>(`${this.baseURL}`, category);
  }
  /* delete category */
  deleteCategory(id: string): Observable<ICategory> {
    // const options = this.getAccessToken();
    return this.http.delete<ICategory>(`${this.baseURL}/${id}`);
  }
  /* update category */
  updateCategory(
    id: string,
    category: { name: string }
  ): Observable<ICategory> {
    // const options = this.getAccessToken();
    return this.http.put<ICategory>(`${this.baseURL}/${id}`, category);
  }
  /* get category by id */
  getCategoryById(
    id: string
  ): Observable<{ message: string; data: ICategory }> {
    return this.http.get<{ message: string; data: ICategory }>(
      `${this.baseURL}/${id}`
    );
  }

  /*get posts by category id */
  getCategoryPostId(
    id: string
  ): Observable<{ message: string; data: ICategory }> {
    return this.http.get<{ message: string; data: ICategory }>(
      `${baseURL}/categories/posts/${id}`
    );
  }
}

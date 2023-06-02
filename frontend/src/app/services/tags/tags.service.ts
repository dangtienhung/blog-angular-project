import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITag, ITagDocs } from 'src/app/interfaces/ITag';
import { baseURL } from 'src/app/utils/instance';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  baseURL: string = `${baseURL}/tag`;
  constructor(private http: HttpClient) {}

  /* getAllUsers */
  getAllTags(): Observable<ITagDocs> {
    return this.http.get<ITagDocs>(`${this.baseURL}?_page=1&&_limit=10`);
  }

  getTag(id: string): Observable<ITagDocs> {
    return this.http.get<ITagDocs>(`${this.baseURL}/${id}`);
  }

  /* create */
  createTag(tag: ITag): Observable<ITag> {
    return this.http.post<ITag>(`${this.baseURL}`, tag);
  }
  /* update */
  updateTag(id: string, tag: ITag): Observable<ITag> {
    return this.http.put<ITag>(`${this.baseURL}/${id}`, tag);
  }

  /* delete real */
  deleteTag(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}

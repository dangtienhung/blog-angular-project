import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IComment,
  IResCountComment,
  IResDataCountComment,
  IResDataViewComment,
} from 'src/app/interfaces/comment';
import { baseURL } from 'src/app/utils/instance';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  sendComment(comment: IComment): Observable<IComment> {
    return this.http.post<IComment>(`${baseURL}/comments`, comment);
  }

  deleteComment(id: string): Observable<IComment> {
    return this.http.delete<IComment>(`${baseURL}/comments/${id}`);
  }

  updateComment(id: string, comment: IComment): Observable<IComment> {
    return this.http.put<IComment>(`${baseURL}/comments/${id}`, comment);
  }

  getCommentRefPost(): Observable<IResDataCountComment> {
    return this.http.get<IResDataCountComment>(`${baseURL}/countcommentPosts`);
  }

  getViewComment(id: string): Observable<IResDataViewComment> {
    return this.http.get<IResDataViewComment>(`${baseURL}/commentPosts/${id}`);
  }
}

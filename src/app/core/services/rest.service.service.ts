import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data, Model } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export abstract class RestServiceService<T> {

  constructor(protected http: HttpClient,protected apiUrl: string = "") { }

  all(): Observable<Model<Data>> {
    return this.http.get<Model<Data>>(`${this.apiUrl}`);
  }

  store(data: any): Observable<Model<Data>> {
    return this.http.post<Model<Data>>(`${this.apiUrl}`, data);
  }

  show(id: string): Observable<Model<Data>> {
    return this.http.get<Model<Data>>(`${this.apiUrl}/${id}`);
  }

  update(data: any, id: number): Observable<Model<Data>> {
    return this.http.put<Model<Data>>(`${this.apiUrl}/${id}`, data);
  }

  getById(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

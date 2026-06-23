import { Injectable } from '@angular/core';
import { RestServiceService } from './rest.service.service';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService extends RestServiceService<Data> {

  constructor(http: HttpClient) {
    super(
      http,
       `${environment.apiUrlNode}/categories`);
  }
}

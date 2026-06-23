import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Data } from '../models/data';
import { RestServiceService } from './rest.service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService extends RestServiceService<Data>{

   constructor(http: HttpClient) {
    super(
      http,
       `${environment.apiUrlNode}/users`);
  }
}

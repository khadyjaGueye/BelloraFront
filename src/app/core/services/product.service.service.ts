import { Injectable } from '@angular/core';
import { RestServiceService } from './rest.service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService extends RestServiceService<Data>{

 constructor(http: HttpClient) {
    super(
      http,
       `${environment.apiUrlNode}/produits`);
  }
}

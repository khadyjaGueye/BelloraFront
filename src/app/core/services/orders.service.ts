import { Injectable } from '@angular/core';
import { RestServiceService } from './rest.service.service';
import { Data } from '../models/data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends RestServiceService<Data> {

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiUrlNode}/orders`);
  }
}

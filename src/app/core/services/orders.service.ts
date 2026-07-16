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

  getOrderCount() {
    return this.http.get(`${environment.apiUrlNode}/orders/count/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  getOrderCountByStatus(status: Number) {
    return this.http.get<Data>(`${environment.apiUrlNode}/orders/count/${status}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  getClientCount(){
      return this.http.get<Data>(`${environment.apiUrlNode}/orders/count/clients`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}

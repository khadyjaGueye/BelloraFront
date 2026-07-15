import { Injectable } from '@angular/core';
import { RestServiceService } from './rest.service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService extends RestServiceService<Data> {

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiUrlNode}/products`);
  }

  getByCategory(id: number | string) {
    return this.http.get(`${environment.apiUrlNode}/products/${id}/category`);
  }

  getLastProductsByCategories() {
    return this.http.get(`${environment.apiUrlNode}/products/categories/last-products`);
  }

}

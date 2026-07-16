import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Data } from '../models/data';
import { RestServiceService } from './rest.service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

   constructor(private http: HttpClient) {}

update(data: FormData) {
  return this.http.put(`${environment.apiUrlNode}/users/profile`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

changePassword(data:any){
   return this.http.put(`${environment.apiUrlNode}/users/change-password`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}

getUserCount(){
  return this.http.get<Data>(`${environment.apiUrlNode}/users/count`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
}
}

import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl =  `${environment.apiUrlNode}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  profile() {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  
}

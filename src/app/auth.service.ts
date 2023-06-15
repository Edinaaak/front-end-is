import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.URL + "Auth";
  constructor(private http:HttpClient) { }


  login( credentials : any)
  {
    return this.http.post<any>(`${this.url}/login`, credentials);
  }


  isLoggedIn()
  {
    var user = localStorage.getItem('user');
    if(user)
      return true;
    return false;
  }

  logout()
  {
    localStorage.removeItem('user');
  }


  register( registerInfo : any)
  {
    return this.http.post<any>(`${this.url}/register`, registerInfo);
  }
}

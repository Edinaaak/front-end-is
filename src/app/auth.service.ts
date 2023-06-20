import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { User } from './interfaces/User';
import { logout } from './store/actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.URL + "Auth";
  constructor(private http:HttpClient, private router:Router, private store:Store<{user:User}>) { }


  login( credentials : any )
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
    this.store.dispatch(logout())
    localStorage.removeItem('user');
    this.router.navigate([''])
  }


  register( registerInfo : any)
  {
    return this.http.post<any>(`${this.url}/register`, registerInfo);
  }
}

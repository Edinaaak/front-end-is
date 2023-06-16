import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from './interfaces/User';
import { login } from './store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-end-is';
  constructor(private router: Router, private store: Store<{user : User}>) {}

  ngOnInit(): void {

    const userStorage = localStorage.getItem('user');
    this.user = userStorage !== null ? JSON.parse(userStorage) : null;
    this.store.dispatch(login(this.user))
  }

  user : User = {} as User
  homePage : boolean = false
  isHomePagee : any = {}
  isHomePage(): boolean {
    return this.router.url === '/';
  }
}

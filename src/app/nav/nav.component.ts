import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authService : AuthService
  user : User = {} as User
  constructor(service : AuthService, private store: Store<{user:User}>) {
    this.authService = service
  }
  @Input() isHomePage: boolean = false;
  ngOnInit(): void {

    this.store.select('user').subscribe(res=>
      {
        this.user = res
      })
  }


}

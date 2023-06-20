import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authService : AuthService
  user: User = {} as User
  constructor(service : AuthService, private store:Store<{user: User}>)
  {
    this.authService = service
   }
  imagePath = '/assets/images/cover.jpg';
  ngOnInit(): void {
    this.store.select('user').subscribe(res=>
      {
        this.user = res
      })
  }

}

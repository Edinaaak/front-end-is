import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authService : AuthService
  constructor(service : AuthService)
  {
    this.authService = service
   }
  imagePath = 'assets/images/slika.jpg';
  ngOnInit(): void {
  }

}

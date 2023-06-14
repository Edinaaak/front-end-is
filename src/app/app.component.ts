import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end-is';
  constructor(private router: Router) {}
  homePage : boolean = false
  isHomePagee : any = {}
  isHomePage(): boolean {
    return this.router.url === '/';
  }
}

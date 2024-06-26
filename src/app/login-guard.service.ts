import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private userService : AuthService, private router:Router) { }
  canActivate() {
    if(!this.userService.isLoggedIn())
    {
      this.router.navigate(['login'])
      return false
    }
    else{
    return true
    }
  }
}

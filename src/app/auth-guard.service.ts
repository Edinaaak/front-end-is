import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private loginService: AuthService, private router: Router) { }
  canActivate() {

    if(this.loginService.isLoggedIn())
    {
      this.router.navigate([''])
      return false;
    }
    return true;

  }
}

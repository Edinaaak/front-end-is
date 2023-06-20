import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { User } from './interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  user : User = {} as User
  constructor(private store:  Store<{user:User}>, private router: Router) {
    this.store.select('user').subscribe(res=>
      {
        this.user = res;
      })
   }

  canActivate() {

    if(this.user.role == 'Admin')
      return true;
    else{
      this.router.navigate(['unauthorized'])
      return false
    }

  }
}

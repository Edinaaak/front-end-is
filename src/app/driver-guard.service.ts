import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from './interfaces/User';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class DriverGuardService implements CanActivate{

  user : User = { } as User
  constructor(private store : Store<{user : User}>, private router : Router ) {
    store.select('user').subscribe(res=>
      {
        this.user = res
      })
   }
  canActivate():boolean {
    if(this.user.role == 'Driver')
      return true;
    else{
      this.router.navigate(['unauthorized'])
      return false;
    }

  }


}

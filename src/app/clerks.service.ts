import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './interfaces/User';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ClerksService implements CanActivate {

  constructor(private store: Store<{user: User}>, private router:Router) {
    this.store.select('user').subscribe(res=>
      {
        this.user = res
      })
  }
  user : User = {} as User
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.user.role == 'Conductor')
        return true;
    else
    {
      this.router.navigate(['unauthorized'])
      return false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private store: Store<{user : User}>, private router:Router, private userService: UserService) { }
  user : User = {} as User
  ngOnInit(): void {
    this.store.select('user').subscribe(res=>
      {
        this.user = res;
      })
  }

  update(id:string)
  {
    this.router.navigate([`update-user/${id}`])
  }

  delete(id:string)
  {
    var response = confirm("Do you really want to delete your profile?")
    if(response)
    {
    this.userService.deleteUser(id).subscribe(res=>
      {
        console.log(res)
      },
      error=>
      {
        console.log(error)
      })
      localStorage.removeItem('user');
      this.router.navigate([''])
    }
  }

}

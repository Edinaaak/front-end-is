import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService : UserService, private router:Router) { }
  users : any = {}
  usersFilter : any = {}
  ngOnInit(): void {
    this.fetchUsers();
  }

  update(id : string)
  {
    this.router.navigate(['update-user', id]);

  }
  fetchUsers ()
  {
    this.userService.getAllUsers().subscribe(res=>
      {
        this.users = res
        console.log(this.users)
      },
      error =>
      {
        console.log(error)
      })
  }

  delete(id : string)
  {
     let response = confirm("Do you want to delete this user?");
     if(response)
     this.userService.deleteUser(id).subscribe(
      res=>
      {
        console.log("deleted", res)
        this.fetchUsers()
      },
      error =>
      {
        console.log(error)
      }
     )
  }

  filterUsers()
  {
    let role = (document.getElementById('id') as HTMLInputElement).value
    this.usersFilter = this.users.filter((x:any) => x?.role == role)
  }

}

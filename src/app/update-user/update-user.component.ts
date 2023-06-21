import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { updateUser } from '../store/actions/user.actions';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService : UserService, private router: ActivatedRoute, private router2 : Router,
    private userStorage : Store<{user:User}>) { }
  idUser : any = {}
  user : any = {}
  userFromStorage : User  = {} as User
  Error : string = ""
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  updateForm = new FormGroup(
    {
      name : new FormControl('',[ Validators.required, Validators.minLength(3),Validators.maxLength(15)]),
      surname : new FormControl('', [Validators.required,  Validators.minLength(3),Validators.maxLength(20)]),
      password : new FormControl('', Validators.required),
      newPassword : new FormControl('', [Validators.pattern(this.passwordPattern)]),
      employmentDate : new FormControl('', Validators.required),
    }
  )
  get name ()
  {
    return this.updateForm.get('name')
  }
  get surname ()
  {
    return this.updateForm.get('surname')
  }
  get newPassword ()
  {
    return this.updateForm.get('newPassword')
  }
  get employmentDate ()
  {
    return this.updateForm.get('employmentDate')
  }
  ngOnInit(): void {

    this.router.paramMap.subscribe(res =>
      {
        this.idUser = res.get('id')
        console.log(this.idUser)
        this.userService.getUser(this.idUser).subscribe(res=>
          {
            this.user = res;
            this.updateForm.get('name')?.setValue(this.user.name)
            this.updateForm.get('surname')?.setValue(this.user.surname)
            this.updateForm.get('employmentDate')?.setValue(this.user.employmentDate)
          },
          error =>
          {
            console.log(error)
          })
      })

      this.userStorage.select('user').subscribe(res=>
        {
          this.userFromStorage = res
        })
  }

  update()
  {
    let user =
    {
      name : this.updateForm.get('name')?.value,
      surname : this.updateForm.get('surname')?.value,
      employmentDate : this.updateForm.get('employmentDate')?.value,
      password : this.updateForm.get('password')?.value,
      newPassword : this.updateForm.get('newPassword')?.value,
    }
    this.userService.updateUser(this.idUser, user).subscribe(res=>
      {
        console.log(res,"updatedd")
        this.userStorage.dispatch(updateUser({user:res}))
        localStorage.setItem('user', JSON.stringify(this.userFromStorage))
        this.router2.navigate([''])
      },
      error=>
      {
        console.log(error)
        this.Error = error.error
      })
  }

}

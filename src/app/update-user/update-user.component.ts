import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService : UserService, private router: ActivatedRoute) { }
  idUser : string = ""
  user : any = {}
  updateForm = new FormGroup(
    {
      name : new FormControl('', Validators.required),
      surname : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      newPassword : new FormControl('', Validators.required),
      employmentDate : new FormControl('', Validators.required),
    }
  )
  ngOnInit(): void {

    this.router.paramMap.subscribe(param =>
      {
        this.idUser = param.get('id')?? "0"
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
      },
      error=>
      {
        console.log(error)
      })
  }

}

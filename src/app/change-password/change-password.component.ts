import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService : UserService, private router: ActivatedRoute, private route : Router) { }
  resetForm = new FormGroup({
    newPassword : new FormControl()
  })
  param1 : string = ""
  param2 : string = ""
  ngOnInit(): void {

    this.router.queryParamMap.subscribe(res=>
      {
        this.param1 = res.get('Id') || ''
        this.param2 = res.get('token') || ''
        console.log(this.param1, this.param2)
      })
  }

  resetPass()
  {
    let request =
    {
      idUser: this.param1,
      newPassword: this.resetForm.get('newPassword')?.value
    }
    this.userService.changePassword(request).subscribe(res=>
      {
        console.log(res)
        this.route.navigate([''])

      })
  }

}

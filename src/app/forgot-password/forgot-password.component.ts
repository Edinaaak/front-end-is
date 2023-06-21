import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private userService : UserService) { }
  resetForm = new FormGroup({
    email : new FormControl('', [Validators.email, Validators.required])
  })
  get email()
  {
    return this.resetForm.get('email')
  }
  ngOnInit(): void {}

  resetPass()
  {

      this.userService.forgotPassword(this.resetForm.get('email')?.value).subscribe(res=>
        {
          console.log(res)
        },
        error=>
        {
          console.log(error)
        })
  }

}

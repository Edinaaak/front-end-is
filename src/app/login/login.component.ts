import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service : AuthService, private router:Router) { }
  loginForm = new FormGroup(
    {
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    }
  )
  ngOnInit(): void {
  }

  login()
  {
    let user =
    {
      email : this.loginForm.get('email')?.value,
      password : this.loginForm.get('password')?.value
    }
    this.service.login(user).subscribe(res=>
      {
        localStorage.setItem('user', res.user);
        console.log("user is logged");
        this.router.navigate([''])
      },
      error=>
      {
        console.log(error)
      })
  }

}

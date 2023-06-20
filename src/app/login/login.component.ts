import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { login } from '../store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service : AuthService, private router:Router, private store:Store<{user:User}>) { }
  loginForm = new FormGroup(
    {
      email : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    }
  )
  Error : string = ""
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
        this.store.dispatch(login(res))
        localStorage.setItem('user', JSON.stringify(res));
        console.log("user is logged", res);
        this.router.navigate([''])
      },
      error=>
      {
        console.log(error)
        this.Error = error.error
      })
  }

}

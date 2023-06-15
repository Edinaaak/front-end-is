import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
      surname: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      employmentDate: new FormControl('', [Validators.required]),
      workExperience: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      idRole : new FormControl(Validators.required)
    }
  )
  idUser: string = ""
  notification: string = ""
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    console.log(this.name)
  }

  get name() {
    return this.registerForm.get('name')
  }

  get surname(){
    return this.registerForm.get('surname')
  }

  get email()
  {
    return this.registerForm.get('email')
  }

  get password()
  {
    return this.registerForm.get('password')
  }

  get employmentDate ()
  {
    return this.registerForm.get('employmentDate')
  }
  get workExperience()
  {
    return this.registerForm.get('workExperience')
  }

  get idRole ()
  {
    return this.registerForm.get('idRole')
  }

  selectId() {
    this.idUser = (document.getElementById('idUser') as HTMLInputElement)?.value;

  }
  add() {
    let user =
    {
      name: this.registerForm.get('name')?.value,
      surname: this.registerForm.get('surname')?.value,
      email: this.registerForm.get('email')?.value,
      userName: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      workExperience: this.registerForm.get('workExperience')?.value,
      employmentDate: this.registerForm.get('employmentDate')?.value,
      role: this.idUser
    }
    if (this.idUser == "") {

        alert("Choose the correct one")
    }
    else {
      this.authService.register(user).subscribe(res => {
        console.log("registered successfully")
        this.notification = "Registered successfully"
      },
        error => {
          console.log(error)
        })
    }
  }

}

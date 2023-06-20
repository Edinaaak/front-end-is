import { Component, OnInit } from '@angular/core';
import { BusService } from '../bus.service';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buses-list',
  templateUrl: './buses-list.component.html',
  styleUrls: ['./buses-list.component.css']
})
export class BusesListComponent implements OnInit {

  constructor(private busService : BusService, private store: Store<{user: User}>, private router:Router) { }
  buses : any = {}
  user : User = {} as User
  reportForm = new FormGroup({
    date : new FormControl('', Validators.required),
    description: new FormControl('', Validators.maxLength(5))
  })
  ngOnInit(): void {
    this.store.select('user').subscribe(res=>
      {
        this.user = res
      })
  this.busService.getBusesForDriver(this.user.user?.id).subscribe(res=>
    {
      this.buses = res;
      console.log(this.user.user?.id, this.buses)
    })
  }
  get date ()
  {
    return this.reportForm.get('date')
  }

  get description ()
  {
    return this.reportForm.get('description')
  }
  report (id : number)
  {
    var request =

    {
        date: this.reportForm.get('date')?.value,
        description:  this.reportForm.get('description')?.value,
        busId: id

    }

    this.busService.reportFailure(request).subscribe(res=>
      {
        console.log(res)
        alert("You reported a failure successfully")
        this.router.navigate([''])
      },
      error =>
      {
        console.log(error)
      })

  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private store: Store<{user : User}>, private datePipe:DatePipe) { }
  user : User = {} as User
  travels : any = {}
  travelsFilter : any = {}
  dates : any = {}
  ngOnInit(): void {

   this.store.select('user').subscribe(res =>
      {
        this.user = res;
        this.travels = res.travels
        this.dates = new Set(this.travels.map((x:any) => this.getDate(x.travel?.travelDate)))
        console.log(this?.travels)
        console.log(this.dates)
      })

  }

  getDate(data : any)
  {

        let newData = new Date(data);
        let date = this.datePipe.transform(newData, 'dd/MM/yyyy');
        return date;

  }

  filterTravel()
  {
    let date = (document.getElementById('id') as HTMLInputElement).value
    this.travelsFilter = this.travels.filter((x:any) => this.getDate(x?.travel?.travelDate) == date)
  }

}

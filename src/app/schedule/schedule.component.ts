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
  ngOnInit(): void {

   this.store.select('user').subscribe(res =>
      {
        this.user = res;
        this.travels = res.travels
        console.log(this?.travels)
      })

  }

  getDate(data : any)
  {

        let newData = new Date(data);
        let date = this.datePipe.transform(newData, 'dd/MM/yyyy');
        return date;

  }

}

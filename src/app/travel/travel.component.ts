import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../schedule.service';
import { BusService } from '../bus.service';
import { TravelService } from '../travel.service';


@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  constructor(private schService : ScheduleService, private busService : BusService, private travelService : TravelService) { }
  schedules : any = {}
  days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  formLine = new FormGroup(
    {
        date : new FormControl('', Validators.required)
    }
  )
  get date ()
  {
    return this.formLine.get('date')
  }
  buses : any = {}
  idSchedule : number = 0
  idBus : number = 0
  Success: boolean = false
  ngOnInit(): void {
    this.schService.getScheduleWithBusline().subscribe(res=>
      {
        this.schedules = res
        console.log(res)
      },
      error=>
      {
        console.log(error)
      })

    this.busService.getBuses().subscribe(res=>
      {
        this.buses = res
      },
      error =>
      {
        console.log(error)
      })
  }

  setDay(date :any)
  {
    const formDate = date;
    const date1 = new Date(formDate);
    const day = date1.getDay();
    return this.days[day]
  }
  selectSchedule()
  {
    this.idSchedule = +((document.getElementById('idSchedule') as HTMLInputElement).value)
    console.log(this.idSchedule)
  }

  selectBus()
  {
    this.idBus = +((document.getElementById('idBus') as HTMLInputElement).value)
  }
  addTravel()
  {
      let day = this.setDay(this.formLine.get('date')?.value);
      let schedule = this.schedules.find((x:any) => x?.id == this.idSchedule)
      console.log(day, schedule?.day)
      if(schedule?.day == day)
      {
          let travel =
          {
            travelDate : this.formLine.get('date')?.value,
            scheduleId : this.idSchedule,
            busId : this.idBus
          }
          if(this.idBus != 0 && this.idSchedule != 0)
          this.travelService.addTravel(travel).subscribe(res=>
            {
              console.log(res)
              this.Success = res
            },
            error=>
            {
              console.log(error)
            })
            else
            alert("You have to choose bus and schedule")
      }
      else
      {
        alert("You did not choose correct day");
      }

  }
}

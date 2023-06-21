import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { BusService } from '../bus.service';
import { TravelService } from '../travel.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-travel',
  templateUrl: './update-travel.component.html',
  styleUrls: ['./update-travel.component.css']
})
export class UpdateTravelComponent implements OnInit {

  constructor(private schService : ScheduleService, private busService : BusService,
    private travelService : TravelService, private router:ActivatedRoute, private datePipe:DatePipe) { }
  travel : any = {}
  schedule : any = {}
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
  idTravel : any = {}
  idBus : number = 0
  Success: boolean = false
  Error : string = ""
  ngOnInit(): void {

    this.router.paramMap.subscribe(res=>
      {
          this.idTravel = res.get('id')

      })
    this.travelService.getTravel(this.idTravel).subscribe(res=>
      {
        this.travel = res
        console.log(res)
        this.formLine.get('date')?.setValue(this.datePipe.transform(this.travel.travelDate, 'yyyy-MM-dd'))
        this.schService.getById(this.travel.scheduleId).subscribe(res=>
          {
            this.schedule = res
          })
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


  selectBus()
  {
    this.idBus = +((document.getElementById('idBus') as HTMLInputElement).value)
  }
  updateTravel()
  {
      let day = this.setDay(this.formLine.get('date')?.value);
      console.log(day, this.schedule?.day)
      if(this.schedule?.day == day)
      {
          let travel =
          {
            travelDate : this.formLine.get('date')?.value,
            busId : this.idBus
          }
          if(this.idBus != 0 && this.schedule?.id != 0)
          this.travelService.updateTravel(travel, this.idTravel).subscribe(res=>
            {
              console.log(res)
              this.Success = res
            },
            error=>
            {
              this.Error = error.error
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

  checkDate()
  {
    let date = new Date((document.getElementById('form2Example1') as HTMLInputElement).value)
    let today = new Date();
    if(date < today)
    {
        alert("You have to choose upcoming date")
    }
  }

}

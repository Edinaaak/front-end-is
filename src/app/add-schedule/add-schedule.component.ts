import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  constructor(private service :ScheduleService) { }
  formLine = new FormGroup({
    Arrival : new FormControl(),
    Departure : new FormControl(),
    Platform : new FormControl(),
    Direction : new FormControl(),
  })
  day : string = "";
  busline :string = ""

  ngOnInit(): void {
  }
  selectDay()
  {
    this.day = (document.getElementById('idDay') as HTMLInputElement).value
  }

  selectBusline()
  {
    this.busline = (document.getElementById('idBusline') as HTMLInputElement).value
  }

  addSchedule()
  {
    let schedule = {
      arrivalTime: this.formLine.get('Arrival')?.value,
      departureTime: this.formLine.get('Departure')?.value,
      platform: this.formLine.get('p=Platform')?.value,
      day: this.day,
      direction: this.formLine.get('Direction')?.value,
      busLineId: 2

    }
    this.service.addSchedule(schedule).subscribe(res=>
      {
        console.log("added", res)
      },error =>
      {
        console.log(error)
      })


  

  }

}

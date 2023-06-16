import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ScheduleService } from '../schedule.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  constructor(private service :ScheduleService, private userService : UserService) { }
  formLine = new FormGroup({
    Arrival : new FormControl(),
    Departure : new FormControl(),
    Platform : new FormControl(),
    Direction : new FormControl(),
  })
  day : string = "";
  busline :string = ""
  checkboxes: { value: string, checked: boolean, disabled: boolean }[] = [];
  maxSelections = 2;

  ngOnInit(): void {
    this.userService.getDrivers().subscribe(res=>
      {
        this.checkboxes = res.map((x:any) => ({ value: x?.name, checked: false, disabled:false }))
      })
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
      platform: this.formLine.get('Platform')?.value,
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


  onCheckboxChange(checkbox:any) {
    if(checkbox.checked == false)
    checkbox.checked = true
    else if(checkbox.checked == true)
    checkbox.checked = false
    const checkedCount = this.checkboxes.filter(checkbox => checkbox.checked).length;

    if (checkedCount > this.maxSelections) {
      // Onemogući označavanje dodatnih checkboxova
      this.checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
          checkbox.disabled = true;
        }
      });
    } else {
      // Omogući sve checkboxove
      this.checkboxes.forEach(checkbox => {
        checkbox.disabled = false;
      });
    }
    console.log(this.checkboxes)
  }






}

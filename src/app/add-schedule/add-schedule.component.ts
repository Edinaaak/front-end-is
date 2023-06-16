import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScheduleService } from '../schedule.service';
import { UserService } from '../user.service';
import { BuslineService } from '../busline.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  constructor(private service :ScheduleService, private userService : UserService, private buslineService : BuslineService) { }
  formLine = new FormGroup({
    Arrival : new FormControl('', Validators.required),
    Departure : new FormControl('', Validators.required),
    Platform : new FormControl('', Validators.required),
    Direction : new FormControl(),
  })
  day : string = "";
  busline :string = ""
  buslines :any = {}
  checkboxes: { id: string, value: string, checked: boolean, disabled: boolean }[] = [];
  maxSelections = 2;
  driverList : any = []
  busyDrivers : boolean = false;
  Error : any = {};
  Success : boolean = false;

  get Arrival()
  {
    return this.formLine.get('Arrival')
  }

  get Departure()
  {
    return this.formLine.get('Departure')
  }

  get Platform ()
  {
    return this.formLine.get('Platform')
  }

  ngOnInit(): void {
    this.userService.getDrivers().subscribe(res=>
      {
        this.checkboxes = res.map((x:any) => ({ id:x?.id, value: x?.name + " " + x?.surname , checked: false, disabled:false }))
      })
    this.buslineService.getBusline().subscribe(res=>
      {
        this.buslines = res
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
      direction: true,
      busLineId: this.busline

    }

    let scheduleUser  = {

      request : schedule,
      driverList : this.driverList
    }

    if(this.checkboxes.filter(checkbox => checkbox.checked).length == 0 ||this.busline == "" || this.day == "" )
    {
        alert("You have to choose driver, day and line")
    }
    else{
    this.service.addSchedule(scheduleUser).subscribe(res=>
      {
        this.Success = res;
        console.log("added", res)
      },error =>
      {
        this.busyDrivers = true;
        console.log(error?.error)
        this.Error = error
      })}

  }


  onCheckboxChange(checkbox:any) {
    if(checkbox.checked == false){
    checkbox.checked = true
    this.driverList.push(checkbox.id);
    console.log(this.driverList)
  }
    else if(checkbox.checked == true){
    checkbox.checked = false
    this.driverList = this.driverList.filter((x:any) => x != checkbox.id)
    console.log(this.driverList)
  }
    const checkedCount = this.checkboxes.filter(checkbox => checkbox.checked).length;

    if (checkedCount > this.maxSelections) {
      // Onemogući označavanje dodatnih checkboxova
      alert("You can choose max 3 drivers for this schedule")
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

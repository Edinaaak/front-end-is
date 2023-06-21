import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.css']
})
export class UpdateScheduleComponent implements OnInit {

  constructor(private service : ScheduleService, private router: ActivatedRoute, private userService : UserService, private routerNav : Router) { }
  id: any = "";
  scheduleDetails : any = {}
  driverList : any = []
  maxSelections = 2;
  checkboxes: { id: string, value: string, checked: boolean, disabled: boolean }[] = [];
  formSchedule = new FormGroup({
    aTime : new FormControl(''),
    dTime: new FormControl(''),
    platform : new FormControl('')
  })
  ngOnInit(): void {
    this.router.paramMap.subscribe(res=>
      {this.id = res.get('id')

      })
      this.userService.getDrivers().subscribe(res=>
        {
          this.checkboxes = res.map((x:any) => ({ id:x?.id, value: x?.name + " " + x?.surname , checked: false, disabled:false }))
        })
    this.service.getScheduleWithDrivers(this.id).subscribe(res=>
      {
        this.scheduleDetails = res[0]
      },
      error=>
      {
        console.log(error)
      })
  }
  onCheckboxChange(checkbox:any) {
    this.maxSelections = 2 - this.scheduleDetails?.users?.length;
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

        this.checkboxes.forEach(checkbox => {
          if (!checkbox.checked) {
            checkbox.disabled = true;
          }
        });
        alert(`You can choose max ${this.maxSelections + 1} drivers for this schedule`)
      } else {
        // Omogući sve checkboxove
        this.checkboxes.forEach(checkbox => {
          checkbox.disabled = false;
        });
      }
      console.log(this.checkboxes)
  }

  updateSchedule()
  {
    let request =

    {
      arrivalTime : this.formSchedule.get('aTime')?.value,
      departureTime : this.formSchedule.get('dTime')?.value,
      platform : this.formSchedule.get('platform')?.value,
      day : this.scheduleDetails?.schedule?.day,
      id : this.id
    }

    let scheduleUser = {

      request : request,
      driverList : this.driverList

    }

    this.service.update(scheduleUser, this.scheduleDetails?.schedule?.id).subscribe(
      res=>
      {
        console.log("updated")
        this.routerNav.navigate(['user-list'])
      },
      error=>
      {
        console.log(error)
      }
    )

  }
  removeDriver (id:string)
  {
    let request : any  =
    {
      IdUser : id,
      IdSchedule : this.id
    }
    this.service.removeDriverFromSchedule(request).subscribe(res=>
      {
        console.log("deleted")
        this.service.getScheduleWithDrivers(this.id).subscribe(res=>
          {
            this.scheduleDetails = res[0]
            console.log('cant save')
          },
          error=>
          {
            console.log(error)
          })
      })
  }

}

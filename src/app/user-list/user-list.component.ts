import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ScheduleService } from '../schedule.service';
import { BuslineService } from '../busline.service';
import { TravelService } from '../travel.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService : UserService, private router:Router, private scheduleService : ScheduleService,
     private buslineService : BuslineService, private travelService : TravelService, private pipe: DatePipe) { }
  users : any = []
  schedules : any = []
  scheduleTime : any = []
  buslines : any = []
  travels : any = []
  buses : any = []
  usersFilter : any = {}
  buslinesFilter : any = []
  travelsFilter : any = []
  schedulesFilter : any = []
  ngOnInit(): void {
    this.fetchUsers();
    this.fetchSchedules();
    this.fetchBuslines();
    this.fetchTravels();
  }

  update(id : string)
  {
    this.router.navigate(['update-user', id]);

  }
  fetchUsers ()
  {
    this.userService.getAllUsers().subscribe(res=>
      {
        this.users = res
        console.log(this.users)
      },
      error =>
      {
        console.log(error)
      })
  }

  fetchSchedules()
  {
    this.scheduleService.getScheduleWithBusline().subscribe(res=>
      {
        this.schedules = res
        console.log(this.schedules)
        this.scheduleTime = new Set(res.map( (x:any) => {return x?.arrivalTime + ":" + x?.departureTime}))
      },
      error =>
      {
        console.log(error)
      })
  }

  fetchBuslines()
  {
    this.buslineService.getBusline().subscribe(res=>
      {
        this.buslines = res;
      },
      error =>
      {
        console.log(error)
      })

  }

  fetchTravels()
  {
    this.travelService.getTravels().subscribe(res=>
      {
          this.travels = res
          this.buses = new Set(res.map((x:any) => x?.bus?.name))
      },
      error =>
      {
        console.log(error)
      })
  }

  delete(id : string)
  {
     let response = confirm("Do you want to delete this user?");
     if(response)
     this.userService.deleteUser(id).subscribe(
      res=>
      {
        console.log("deleted", res)
        this.fetchUsers()
      },
      error =>
      {
        console.log(error)
      }
     )

  }

  filterUsers()
  {
    let role = (document.getElementById('id') as HTMLInputElement).value
    this.usersFilter = this.users.filter((x:any) => x?.role == role)

  }

  findName()
  {
     let ime = (document.getElementById('nameValue') as HTMLInputElement).value;
     console.log(ime)
     if(this.usersFilter.length > 0)
     {
     this.usersFilter = this.usersFilter.filter( (x:any) => x?.name.includes(ime));
     }
     else
     {
      this.usersFilter = this.users.filter( (x:any) => x?.name.includes(ime));
     }
  }

  updateSchedule(id :number)
  {
      this.router.navigate(['update-schedule', id])
  }

  deleteSchedule(id:number)
  {
      var response = confirm("Do you want to delete this schedule");
      if(response)
      {
        this.scheduleService.delete(id).subscribe(res=>
          {
            console.log("deleted")
            this.fetchSchedules();
            this.fetchTravels();
          })
      }
  }

  getDate(data : any)
  {
      let newData = new Date(data);
      let date = this.pipe.transform(newData, 'dd/MM/yyyy');
      return date;
  }

  deleteBusline(id:number)
  {
      this.buslineService.deleteBusline(id).subscribe(res=>
        {
          this.fetchBuslines();
          this.fetchSchedules();
          this.fetchTravels();
        },
        error=>
        {
          console.log(error)
        })
  }

  deleteTravel (id:number)
  {
    this.travelService.deleteTravel(id).subscribe(res=>
      {

        this.fetchTravels();
      },
      error=>
      {
        console.log(error)
      })
  }

  updateTravel(id:number)
  {
      this.router.navigate(['update-travel',id])
  }

  findBusline()
  {
     let city = (document.getElementById('buslineCity') as HTMLInputElement).value;
     console.log(city)
     this.buslinesFilter = this.buslines.filter( (x:any) => {return x?.fromCity.includes(city) || x?.toCity.includes(city)});

  }

  findSchedule()
  {
    let city = (document.getElementById('scheduleCity') as HTMLInputElement).value;
     console.log(city)
     this.schedulesFilter = this.schedules.filter( (x:any) => {return x?.busLine?.fromCity.includes(city) || x?.busLine?.toCity.includes(city)});
  }
  filterSchedule()
  {
    let time = (document.getElementById('filterSchedule') as HTMLInputElement).value;
    this.schedulesFilter = this.schedulesFilter.filter((x:any) => { return x?.arrivalTime + ":" + x?.departureTime == time})
  }

  filterTravel()
  {
    let bus = (document.getElementById('filterTravel') as HTMLInputElement).value;
    this.travelsFilter = this.travels.filter((x:any) => x?.bus?.name == bus )
  }

}

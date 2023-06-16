import { Component, OnInit } from '@angular/core';
import { TravelService } from '../travel.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../interfaces/User';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private travelService :TravelService, private datePipe : DatePipe, private router:Router, private store: Store<{user : User}>) { }
  travels : any = {}
  travelsFilter : any = {}
  routes : any = {}
  dates: any = {}
  user : User = {} as User
  ngOnInit(): void {
    this.travelService.getTravels().subscribe(res=>
      {
        this.travels = res
        this.dates = new Set(res.map((x:any)=>this.datePipe.transform(x?.travelDate, 'dd/MM/yyyy')))
        this.routes = new Set( res.map((x:any) => {return x?.schedule?.busLine?.fromCity + " - " + x?.schedule?.busLine?.toCity}))

        console.log(this.routes)
        console.log(this.travels)
      },
      error =>
      {
        console.log(error)
      })
      this.store.select('user').subscribe(res=>
        {
          this.user = res;
          console.log(this.user?.role[0])
        })
  }

    getDate(data : any)
    {
        let newData = new Date(data);
        let date = this.datePipe.transform(newData, 'dd/MM/yyyy');
        return date;
    }

    getDetails(id:number)
    {
        this.router.navigate(['travel-details', id])
    }

    selectDate()
    {
      let id = (document.getElementById('date') as HTMLInputElement).value
      if(this.travelsFilter.length > 0)
      {
        this.travelsFilter = this.travelsFilter.filter((x:any) => {
          return this.datePipe.transform(x?.travelDate, 'dd/MM/yyyy') == id })
      }
      else
      {
          this.travelsFilter = this.travels.filter((x:any) => {
            return this.datePipe.transform(x?.travelDate, 'dd/MM/yyyy') == id })

      }

    }
    selectRoute()
    {
      let id = (document.getElementById('route') as HTMLInputElement).value
      if(this.travelsFilter.length > 0)
      {
        this.travelsFilter = this.travelsFilter.filter((x:any) => {
          return x?.schedule?.busLine?.fromCity + " - " + x?.schedule?.busLine?.toCity == id })
      }
      else
      {
          this.travelsFilter = this.travels.filter((x:any) => {
            return x?.schedule?.busLine?.fromCity + " - " + x?.schedule?.busLine?.toCity == id })

      }
    }
}

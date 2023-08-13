import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelService } from '../travel.service';
import { DatePipe } from '@angular/common';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-details-travel',
  templateUrl: './details-travel.component.html',
  styleUrls: ['./details-travel.component.css']
})
export class DetailsTravelComponent implements OnInit {

  constructor(private route: ActivatedRoute, private travelService : TravelService,private datePipe : DatePipe, private ticketService : TicketService) { }
  idTravel : any = {}
  travel : any = {}
  freeSeats : number = 0
  seatNum : string = "Empty"
  amount : number = 0
  Error : string = ""
  ngOnInit(): void {
    this.route.paramMap.subscribe(res=>
      {
        this.idTravel = res.get('id')

      })
      this.travelService.getTravel(this.idTravel).subscribe(res=>
        {
          this.travel = res
          console.log(res)
        })
      this.ticketService.getSeats(this.idTravel).subscribe(res=>
        {
          this.freeSeats = res
        })
  }
  getDate(data : any)
  {
      let newData = new Date(data);
      let date = this.datePipe.transform(newData, 'dd/MM/yyyy');
      return date;
  }

  reserve()
  {
    let ticketRequest =
    {
      numTicket: (document.getElementById('numTicket') as HTMLInputElement).value,
      travelId: this.idTravel
    }

    this.ticketService.reserveTicket(ticketRequest).subscribe(res=>
      {
        this.seatNum = String(res?.seatNumbers);
        this.amount = res?.amount;
        this.ticketService.getSeats(this.idTravel).subscribe(res=>
          {
            this.freeSeats = res
            this.Error = ''
          })
      },
      error =>
      {
        console.log(error)
        this.Error = 'there are no more free seats'
      })
  }


}

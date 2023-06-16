import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  url = environment.URL + "Ticket"
  constructor(private http : HttpClient) {}

  reserveTicket(data : any)
  {
    return this.http.post<any>(`${this.url}/add-ticket`, data )
  }

  getSeats (id : number)
  {
    return this.http.get<any>(`${this.url}/seats/${id}`)
  }
}

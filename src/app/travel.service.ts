import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  url = environment.URL + "Travel"
  constructor(private http : HttpClient) { }

  addTravel(data:any)
  {
    return this.http.post<any>(this.url, data)
  }

  getTravels()
  {
    return this.http.get<any>(this.url)
  }

  getTravel (id : number)
  {
    return this.http.get<any>(`${this.url}/${id}`)
  }
}

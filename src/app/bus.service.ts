import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  url = environment.URL + "Bus"
  constructor(private http:HttpClient) { }


  getBuses()
  {
    return this.http.get<any>(this.url)
  }

  getBusesForDriver(id : string)
  {
    return this.http.get<any>(`${this.url}/busDriver/${id}`)
  }

  reportFailure (request :  any)
  {
    return this.http.post<any>(`${this.url}/report-failure`, request)
    }
}

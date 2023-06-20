import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuslineService {

  url : string = environment.URL + "Busline"
  constructor(private http:HttpClient) { }

  addBusline(data:any)
  {
    return this.http.post<any>(`${this.url}`, data)
  }

  getBusline()
  {
    return this.http.get<any>(this.url)
  }

  deleteBusline(id:number)
  {
    return this.http.delete<any>(`${this.url}/${id}`)
  }


}

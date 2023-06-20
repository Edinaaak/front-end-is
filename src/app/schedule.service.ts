import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) { }
  url = environment.URL + "Schedule";


  addSchedule(data:any)
  {
    return this.http.post<any>(`${this.url}`,data)
  }

  getScheduleWithBusline()
  {
    return this.http.get<any>(this.url);
  }

  getScheduleWithDrivers(id : number)
  {
    return this.http.get<any>(`${this.url}/schedule-user/${id}`)
  }

  delete(id:number)
  {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  update( data : any, id:number)
  {
    return this.http.put<any>(`${this.url}/${id}`, data);
  }

  removeDriverFromSchedule(request : any)
  {
    const params =
    {
      IdUser : request.IdUser,
      IdSchedule : request.IdSchedule
    }
    return this.http.delete<any>(`${this.url}User`,{params} );
  }

  getById(id:any)
  {
    return this.http.get<any>(`${this.url}/${id}`)
  }
}

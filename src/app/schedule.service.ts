import { HttpClient } from '@angular/common/http';
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
    return this.http.post<any>(`${this.addSchedule}`,data)
  }
}

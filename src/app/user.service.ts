import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.URL + "User"
  constructor(private http:HttpClient) { }

  getAllUsers()
  {
    return this.http.get<any>(this.url)
  }


  deleteUser(id:string)
  {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  getUser (id : string)
  {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  updateUser(id : string, data:any)
  {
    return this.http.put<any>(`${this.url}/${id}`, data)
  }

  getDrivers()
  {
    return this.http.get<any>(`${this.url}/drivers`)
  }
}

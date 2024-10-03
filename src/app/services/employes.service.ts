import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  public baseUrl = 'http://localhost:3000/employees';


  constructor(private _httpClient:HttpClient) { }

  createEmployee(payload:any):Observable<any>{
    return this._httpClient.post(this.baseUrl,payload);
  }

  getEmployees():Observable<any>{
    return this._httpClient.get(this.baseUrl);
  }

  updateEmployee(id:number,asdf:any):Observable<any>{
    return this._httpClient.put(this.baseUrl + '/' + id,asdf);
  }

  deleteEmployee(id:number):Observable<any>{
    return this._httpClient.delete(this.baseUrl + '/' +id);
  }
}

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LeaveType} from "../models/leaveType";

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {

  BASE_URL = "http://localhost:9091";
  API_URL = this.BASE_URL + "/tnl/leaveTypeApi/";

  constructor(
    private http: HttpClient,
  ) { }

  getList(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  create(model: LeaveType): Observable<LeaveType>{
    return this.http.post<LeaveType>(this.API_URL, model);
  }

  update(model: LeaveType, id: number): Observable<LeaveType>{
    return this.http.put<LeaveType>(this.API_URL + '/' + id, model);
  }

  delete(id: number): Observable<any>{
    return this.http.delete<any>(this.API_URL + '/' + id);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Department} from "../models/department";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  BASE_URL = "http://localhost:9090";
  API_URL = this.BASE_URL + "/hr/deptApi/";

  constructor(
    private http: HttpClient,
  ) { }

  getList(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  create(model: Department): Observable<Department>{
    return this.http.post<Department>(this.API_URL, model);
  }

  update(model: Department, id: number): Observable<Department>{
    return this.http.put<Department>(this.API_URL + "/" + id, model);
  }

  delete(id: number): Observable<Department>{
    return this.http.delete<Department>(this.API_URL + '/' + id);
  }
}

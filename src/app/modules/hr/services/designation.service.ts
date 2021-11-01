import {Injectable} from '@angular/core';
import {Designation} from "../models/designation";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  BASE_URL = "http://localhost:9090";
  API_URL = this.BASE_URL + "/hr/desgApi/";

  constructor(
    private http: HttpClient,
  ) {
  }

  getList(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  create(model: Designation): Observable<Designation> {
    return this.http.post<Designation>(this.API_URL, model);
  }

  update(model: Designation, id: number): Observable<Designation> {
    return this.http.put<Designation>( this.API_URL + '/' + id, model);
  }

  delete(id: number): Observable<Designation>{
    return this.http.delete<Designation>(this.API_URL + "/" + id);
  }
}

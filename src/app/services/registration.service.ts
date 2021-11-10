import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registration} from "../models/registration";
import {RegistrationResponse} from "../models/registrationResponse";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  BASE_URL = "http://localhost:9092";
  API_URL = this.BASE_URL + "/admin/auth/";

  constructor(
    private http: HttpClient,
  ) { }

  create(model: Registration): Observable<RegistrationResponse>{
    return this.http.post<RegistrationResponse>(this.API_URL, model);
  }

  getList(): Observable<any> {
    console.log(this.API_URL);
    return this.http.get<any>(this.API_URL);
  }
}

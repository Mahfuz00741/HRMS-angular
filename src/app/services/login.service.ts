import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Registration} from "../models/registration";
import {Observable} from "rxjs";
import {Login} from "../models/login";
import {LoginResponse} from "../models/loginResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL = "http://localhost:9092";
  API_URL = this.BASE_URL + "/admin/auth/login/";

  constructor(
    private http: HttpClient,
  ) { }

  login(model: Login): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.API_URL, model);
  }
}

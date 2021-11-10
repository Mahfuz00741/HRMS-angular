import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Report} from "../models/report";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  BASE_URL = 'http://localhost:9090/hr/';
  API_URL = this.BASE_URL + 'reportApi/report';

  constructor(
    private http: HttpClient,
  ) { }

  printReport(model: Report): Observable<Blob> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.API_URL, model,
      { headers, responseType: 'blob'}
    );
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Department} from "../../hr/models/department";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL = "http://localhost:9092";
  API_URL = this.BASE_URL + "/admin/userApi/";

  constructor(
    private http: HttpClient,
  ) {
  }

  getList(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  create(model: User): Observable<User>{
    return this.http.post<User>(this.API_URL, model);
  }

  update(model: User, id: number): Observable<User>{
    return this.http.put<User>(this.API_URL + "/" + id, model);
  }

  delete(id: number): Observable<User>{
    return this.http.delete<User>(this.API_URL + '/' + id);
  }

}

import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  userList: User[] = new Array();
  displayedColumns = ['id', 'code', 'name', 'email', 'mobileNo', 'active', 'roles', 'action'];

  constructor(
    private service: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): any {
    this.service.getList().subscribe(
      res => {
        this.userList = res.content;
        this.dataSource = new MatTableDataSource(this.userList);
      }
    )
  }

}

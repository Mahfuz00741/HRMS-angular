import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  userList: User[] = new Array();
  displayedColumns = ['id', 'code', 'name', 'email', 'mobileNo', 'active', 'action'];
  userForm: FormGroup;
  model: User = new User();
  message: string;

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.initializeFormValue();
  }

  initializeFormValue(): any {
    this.userForm = this.formBuilder.group(
      {
        id: [],
        photo: ['Photo'],
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        mobileNo: ['', [Validators.required]],
        password: ['', [Validators.required]],
        active: [false, [Validators.required]],
        role: ['USER', [Validators.required]],
      }
    )
  }

  generateModel(isCreate: boolean): any {
    if (isCreate) {
      this.model.id = undefined!;
    } else {
      this.model.id = this.userForm.value.id;
    }
    this.model.photo = this.userForm.value.photo;
    this.model.code = this.userForm.value.code;
    this.model.name = this.userForm.value.name;
    this.model.email = this.userForm.value.email;
    this.model.mobileNo = this.userForm.value.mobileNo;
    this.model.password = this.userForm.value.password;
    this.model.active = this.userForm.value.active;
    this.model.role = this.userForm.value.role;
  }

  getAll(): any {
    this.service.getList().subscribe(
      res => {
        this.userList = res.content;
        this.dataSource = new MatTableDataSource(this.userList);
      }
    )
  }

  submit(): any {
    console.log(this.model)
    if (this.userForm.value.id) {
      this.generateModel(false);
      this.service.update(this.model, this.model.id).subscribe(
        res => {
          this.getAll();
          this.initializeFormValue();
          this.message = "User Updated"
        }, error => {
          console.log("error");
        }
      )
    } else {
      this.generateModel(true);
      this.service.create(this.model).subscribe(
        res => {
          this.getAll();
          this.initializeFormValue();
          this.message = "New User Created"
        }, error => {
          console.log("error");
        }
      )
    }
  }

  edit(row: User): any{
    this.userForm = this.formBuilder.group(
      {
        id: [row.id],
        photo: [row.photo],
        code: [row.code, [Validators.required]],
        name: [row.name, [Validators.required]],
        email: [row.email, [Validators.required]],
        mobileNo: [row.mobileNo, [Validators.required]],
        password: [row.password, [Validators.required]],
        active: [row.active, [Validators.required]],
      }
    )
  }

  clear(): any{
    this.initializeFormValue();
    this.message = "";
  }

}

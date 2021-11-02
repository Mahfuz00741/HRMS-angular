import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../models/department";
import {Designation} from "../../models/designation";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  empList: Employee [] = new Array();
  displayedColumns = ['id', 'code', 'name', 'fatherName', 'dob', 'doj', 'nid',
  'gender', 'email', 'mobileNo', 'active', 'action'];
  employeeForm: FormGroup;
  message: string;
  model: Employee = new Employee();

  constructor(
    private service: EmployeeService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeFormValue();
    this.getAll();
  }

  initializeFormValue(): any{
    this.employeeForm = this.formBuilder.group(
      {
        id: [],
        photo: ['photo'],
        code: ['', [Validators.required]],
        name: ['',[Validators.required]],
        fatherName: ['', [Validators.required]],
        dob: ['2020-10-10', [Validators.required]],
        doj: ['2021-10-30', [Validators.required]],
        nid: ['', [Validators.required]],
        gender: ['MALE', [Validators.required]],
        email: ['', [Validators.required]],
        mobileNo: ['', [Validators.required]],
        active: ['', [Validators.required]],
        userId: ['', [Validators.required]],
        deptId: ['1', [Validators.required]],
        desgId: ['1', [Validators.required]],
        supervisorId: ['1', [Validators.required]],
      }
    )
  }

  getAll(): any{
    this.service.getList().subscribe(
      res =>{
        this.empList = res.content;
        this.dataSource = new MatTableDataSource(this.empList);
      }
    )
  }

  generateModel(isCreate: boolean): any{
    if(isCreate){
      this.model.id = undefined!;
    }
    else{
      this.model.id = this.employeeForm.value.id;
    }
    this.model.photo = this.employeeForm.value.photo;
    this.model.code = this.employeeForm.value.code;
    this.model.name = this.employeeForm.value.name;
    this.model.fatherName = this.employeeForm.value.fatherName;
    this.model.dob = this.employeeForm.value.dob;
    this.model.doj = this.employeeForm.value.doj;
    this.model.nid = this.employeeForm.value.nid;
    this.model.gender = this.employeeForm.value.gender;
    this.model.email = this.employeeForm.value.email;
    this.model.mobileNo = this.employeeForm.value.mobileNo;
    this.model.active = this.employeeForm.value.active;
    this.model.userId = this.employeeForm.value.userId;
    this.model.deptId = this.employeeForm.value.deptId;
    this.model.desgId = this.employeeForm.value.desgId;
    this.model.supervisorId = this.employeeForm.value.supervisorId;
  }

  submit(): any {
    if(this.employeeForm.value.id){
      this.generateModel(false);
      this.service.update(this.model, this.model.id).subscribe(
        res => {
          this.getAll();
          this.initializeFormValue();
          this.message = "Updated"
        }
      )
    }
    else{
      this.generateModel(true);
      this.service.create(this.model).subscribe(
        res =>{
          this.getAll();
          this.initializeFormValue();
          this.message = "Created Department"
        }
      )
    }
  }

  edit(row: Employee): any{
    this.employeeForm = this.formBuilder.group(
      {
        id: [row.id],
        photo: [row.photo, [Validators.required]],
        code: [row.code, [Validators.required]],
        name: [row.name,[Validators.required]],
        fatherName: [row.fatherName, [Validators.required]],
        dob: [row.dob, [Validators.required]],
        doj: [row.doj, [Validators.required]],
        nid: [row.nid, [Validators.required]],
        gender: [row.gender, [Validators.required]],
        email: [row.email, [Validators.required]],
        mobileNo: [row.mobileNo, [Validators.required]],
        active: [row.active, [Validators.required]],
        userId: [row.userId, [Validators.required]],
        deptId: [row.deptId, [Validators.required]],
        desgId: [row.desgId, [Validators.required]],
        supervisorId: [row.supervisorId, [Validators.required]],
      }
    )
  }

  delete(row: Department): any{
    this.service.delete(row.id).subscribe(
      res =>{
        this.getAll();
        this.message = 'Deleted'
        this.initializeFormValue();
      }, error => {
        console.log("Error");
      }
    )
  }

  clear(): any{
    this.initializeFormValue();
    this.message = '';
  }

}

import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../models/department";
import {Observable} from "rxjs";
import {DepartmentService} from "../../services/department.service";
import {DesignationService} from "../../services/designation.service";
import {Designation} from "../../models/designation";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  empList: Employee [] = new Array();
  displayedColumns = ['id', 'code', 'name', 'userId', 'dob', 'doj', 'nid',
  'gender', 'email', 'mobileNo', 'active', 'action'];
  employeeForm: FormGroup;
  message: string;
  model: Employee = new Employee();
  genders: any = ['MALE', 'FEMALE', 'OTHERS'];
  deptList: Department[] = new Array();
  desgList: Designation[] = new Array();

  constructor(
    private service: EmployeeService,
    private formBuilder: FormBuilder,
    private deptService: DepartmentService,
    private designationService: DesignationService,
  ) { }

  ngOnInit(): void {
    this.getDept();
    this.initializeFormValue();
    this.getAll();
    this.getDesg();
  }

  initializeFormValue(): any{
    this.employeeForm = this.formBuilder.group(
      {
        id: [],
        photo: [''],
        code: ['', [Validators.required]],
        name: ['',[Validators.required]],
        fatherName: ['', [Validators.required]],
        dob: ['2020-10-10', [Validators.required]],
        doj: ['2021-10-30', [Validators.required]],
        nid: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        mobileNo: ['', [Validators.required]],
        active: ['', [Validators.required]],
        userId: ['', [Validators.required]],
        deptId: ['', [Validators.required]],
        desgId: ['', [Validators.required]],
        supervisorId: ['', [Validators.required]],
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
          this.message = "Updated";
        }
      )
    }
    else{
      if (!this.isCodeUnique(this.employeeForm.value.code)) {
        this.message = "Code already used";
        console.log("Code already used");
        return;
      }
      if (!this.isNidUnique(this.employeeForm.value.nid)) {
        this.message = "NID already used";
        console.log("NID already used");
        return;
      }
      if (!this.isEmailUnique(this.employeeForm.value.email)) {
        this.message = "Email already used";
        console.log("Email already used");
        return;
      }
      if (!this.isMobileNoUnique(this.employeeForm.value.mobileNo)) {
        this.message = "Mobile number already used";
        console.log("Mobile number already used");
        return;
      }

      if (!this.isUserIdUnique(this.employeeForm.value.userId)){
        this.message = "User Id already used";
        console.log("User Id already used");
        return;
      }
      this.generateModel(true);
      this.service.create(this.model).subscribe(
        res =>{
          this.getAll();
          this.initializeFormValue();
          this.message = "Created Department";
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

  getDept(): any{
    this.deptService.getList().subscribe(
      res =>{
        this.deptList = res.content;
      }
    )
  }

  getDesg(): any{
    this.designationService.getList().subscribe(
      res =>{
        this.desgList = res.content;
      }
    )
  }

  /*All Unique validation check function here*/
  isCodeUnique(code: string): boolean{
    for(let emp of this.empList){
      if (emp.code == code){
        return false;
      }
    }
    return true;
  }

  isNidUnique(nid: string): boolean{
    for(let emp of this.empList){
      if (emp.nid == nid){
        return false;
      }
    }
    return true;
  }

  isEmailUnique(email: string): boolean{
    for(let emp of this.empList){
      if (emp.email == email){
        return false;
      }
    }
    return true;
  }

  isMobileNoUnique(mobileNo: string): boolean{
    for(let emp of this.empList){
      if (emp.mobileNo == mobileNo){
        return false;
      }
    }
    return true;
  }

  isUserIdUnique(userId: number): boolean{
    for(let emp of this.empList){
      if (emp.userId == userId){
        return false;
      }
    }
    return true;
  }

}

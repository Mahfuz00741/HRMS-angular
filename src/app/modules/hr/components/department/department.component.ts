import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Department} from "../../models/department";
import {DepartmentService} from "../../services/department.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../models/employee";

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  dataSource: MatTableDataSource<Department> = new MatTableDataSource();
  deptList: Department[] = new Array();
  displayedColumns = ['id', 'code', 'name', 'active', 'headOfId', 'action'];
  departmentForm: FormGroup;
  model: Department = new Department();
  message: string;
  empList: Employee[] = new Array();

  constructor(
    private service: DepartmentService,
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.initializeFormValue();
    this.getEmp();
  }

  initializeFormValue(): any {
    this.departmentForm = this.formBuilder.group(
      {
        id: [],
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        active: [false, [Validators.required]],
        headOfId: ['', [Validators.required]],
      }
    )
  }

  generateModel(isCreate: boolean): any {
    if (isCreate) {
      this.model.id = undefined!;
    } else {
      this.model.id = this.departmentForm.value.id;
    }
    this.model.code = this.departmentForm.value.code;
    this.model.name = this.departmentForm.value.name;
    this.model.active = this.departmentForm.value.active;
    this.model.headOfId = this.departmentForm.value.headOfId;
  }

  submit(): any {
    if(this.departmentForm.value.id){
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
      if(this.isCodeUnique(this.departmentForm.value.code)){
        this.message = "Department code already exits..!"
        console.log("Department code already exits..!")
      }
      if(this.isNameUnique(this.departmentForm.value.code)){
        this.message = "Department name already exits..!"
        console.log("Department name already exits..!")
      }
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

  getAll(): any {
    this.service.getList().subscribe(
      res => {
        this.deptList = res.content;
        this.dataSource = new MatTableDataSource(this.deptList);
      }, error => {
        console.log("No data found...!!")
      }
    )
  }

  getEmp(): any{
    this.empService.getList().subscribe(
      res => {
        this.empList = res.content;
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

  clear(): any {
    this.initializeFormValue();
    this.message = "";
  }

  edit(row: Department): any{
    this.departmentForm = this.formBuilder.group(
      {
        id: [row.id],
        code: [row.code, [Validators.required]],
        name: [row.name, [Validators.required]],
        active: [row.active, [Validators.required]],
        headOfId: [row.headOfId, [Validators.required]],
      }
    )
  }

  isCodeUnique(code: string): boolean{
    for(let dept of this.deptList){
      if(dept.code == code){
        return false;
      }
    }
    return true;
  }

  isNameUnique(name: string): boolean {
    for (let dept of this.deptList) {
      if (dept.name == name) {
        return false;
      }
    }
    return true;
  }
}

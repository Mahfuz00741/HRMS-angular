import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Department} from "../../models/department";
import {DepartmentService} from "../../services/department.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(
    private service: DepartmentService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.initializeFormValue();
  }

  initializeFormValue(): any {
    this.departmentForm = this.formBuilder.group(
      {
        id: [],
        code: ['', [Validators.required]],
        name: ['', [Validators.required]],
        active: ['', [Validators.required]],
        headOfId: ['1', [Validators.required]],
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
    this.message = ""
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
}

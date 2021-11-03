import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LeaveType} from "../../models/leaveType";
import {LeaveTypeService} from "../../services/leave-type.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css']
})
export class LeaveTypeComponent implements OnInit {

  dataSource: MatTableDataSource<LeaveType> = new MatTableDataSource();
  leaveTypeList: LeaveType[] = new Array();
  displayedColumns = ['id', 'name', 'allowNoOfLeaveMonth', 'allowNoOfLeaveYearly', 'active', 'action'];
  leaveTypeForm: FormGroup;
  message: string;
  model: LeaveType = new LeaveType();


  constructor(
    private service: LeaveTypeService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initializeFormValue();
    this.getAll();
  }

  initializeFormValue(): any {
    this.leaveTypeForm = this.formBuilder.group(
      {
        id: [],
        name: ['', [Validators.required]],
        allowNoOfLeaveMonth: ['4', [Validators.required]],
        allowNoOfLeaveYearly: ['40', [Validators.required]],
        active: ['', [Validators.required]],
      }
    )
  }

  generateModel(isCreate: boolean): any {
    if (isCreate) {
      this.model.id = undefined!;
    } else {
      this.model.id = this.leaveTypeForm.value.id;
    }
    this.model.name = this.leaveTypeForm.value.name;
    this.model.allowNoOfLeaveMonth = this.leaveTypeForm.value.allowNoOfLeaveMonth;
    this.model.allowNoOfLeaveYearly = this.leaveTypeForm.value.allowNoOfLeaveYearly;
    this.model.active = this.leaveTypeForm.value.active;
  }

  submit(): any {
    if (this.leaveTypeForm.value.id) {
      this.generateModel(false);
      this.service.update(this.model, this.model.id).subscribe(
        res => {
          this.getAll();
          this.initializeFormValue();
          this.message = "Leave Type Updated"
        }, error => {
          console.log('Error')
        }
      )
    } else {
      this.generateModel(true);
      this.service.create(this.model).subscribe(
        res => {
          this.getAll();
          this.initializeFormValue();
          this.message = 'New Leave Type Created'
        }
      )
    }
  }

  getAll(): any {
    this.service.getList().subscribe(
      res => {
        this.leaveTypeList = res.content;
        this.dataSource = new MatTableDataSource(this.leaveTypeList);
      }
    )
  }

  edit(row: LeaveType): any {
    this.leaveTypeForm = this.formBuilder.group(
      {
        id: [row.id],
        name: [row.name, [Validators.required]],
        allowNoOfLeaveMonth: [row.allowNoOfLeaveMonth, [Validators.required]],
        allowNoOfLeaveYearly: [row.allowNoOfLeaveYearly, [Validators.required]],
        active: [row.active, [Validators.required]],
      }
    )
  }

  delete(row: LeaveType): any {
    this.service.delete(row.id).subscribe(
      res => {
        this.getAll();
        this.initializeFormValue();
        this.message = "Deleted";
      }
    )
  }

  clear(): any {
    this.initializeFormValue();
    this.message = '';
  }
}

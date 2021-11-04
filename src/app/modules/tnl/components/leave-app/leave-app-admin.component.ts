import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeaveApp} from "../../models/leaveApp";
import {LeaveAppService} from "../../services/leave-app.service";

@Component({
  selector: 'app-leave-app',
  templateUrl: './leave-app-admin.component.html',
  styleUrls: ['./leave-app-admin.component.css']
})
export class LeaveAppAdminComponent implements OnInit {

  dataSource: MatTableDataSource<LeaveApp> = new MatTableDataSource();
  leaveAppList: LeaveApp[] = new Array();
  displayedColumns = ['id', 'appDate', 'fromDate', 'toDate', 'entry', 'employeeId', 'onLeaveContactNo',
    'active', 'remark', 'reason', 'status', 'action'];
  leaveAppForm: FormGroup;
  message: string;
  model: LeaveApp = new LeaveApp();


  constructor(
    private service: LeaveAppService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initializeFormValue();
    this.getAll();
    console.log(this.getAll());
  }

  initializeFormValue(): any {
    this.leaveAppForm = this.formBuilder.group(
      {
        id: [],
        appDate: ['2021-11-03', [Validators.required]],
        fromDate: ['2021-12-12', [Validators.required]],
        toDate: ['2022-01-03', [Validators.required]],
        entry: ['ADMIN', [Validators.required]],
        reason: ['Fever'],
        employeeId: ['', [Validators.required]],
        leaveTypeId: ['', Validators.required],
        onLeaveContactNo: ['', [Validators.required]],
        responsiblePersonId: ['', [Validators.required]],
        active: ['', [Validators.required]],
        remark: [],
        status: ['APPROVED'],
      }
    )
  }


  edit(row: LeaveApp): any {
    this.leaveAppForm = this.formBuilder.group(
      {
        id: [row.id],
        appDate: [row.appDate, [Validators.required]],
        fromDate: [row.fromDate, [Validators.required]],
        toDate: [row.toDate, [Validators.required]],
        entry: [row.entry, [Validators.required]],
        reason: [row.reason],
        employeeId: [row.employeeId, [Validators.required]],
        leaveTypeId: [row.leaveTypeId, Validators.required],
        onLeaveContactNo: [row.onLeaveContactNo, [Validators.required]],
        responsiblePersonId: [row.responsiblePersonId, [Validators.required]],
        active: [row.active, [Validators.required]],
        remark: [row.remark],
        status: [row.status, [Validators.required]],
      }
    )
  }

  generateModel(isCreate: boolean): any {
    if (isCreate) {
      this.model.id = undefined!;
    } else {
      this.model.id = this.leaveAppForm.value.id;
    }
    this.model.appDate = this.leaveAppForm.value.appDate;
    this.model.fromDate = this.leaveAppForm.value.fromDate;
    this.model.toDate = this.leaveAppForm.value.toDate;
    this.model.entry = this.leaveAppForm.value.entry;
    this.model.reason = this.leaveAppForm.value.reason;
    this.model.employeeId = this.leaveAppForm.value.employeeId;
    this.model.leaveTypeId = this.leaveAppForm.value.leaveTypeId;
    this.model.onLeaveContactNo = this.leaveAppForm.value.onLeaveContactNo;
    this.model.responsiblePersonId = this.leaveAppForm.value.responsiblePersonId;
    this.model.active = this.leaveAppForm.value.active;
    this.model.remark = this.leaveAppForm.value.remark;
    this.model.status = this.leaveAppForm.value.status;
  }


  submit(): any {
    if (this.leaveAppForm.value.id) {
      this.generateModel(false);
      this.service.update(this.model, this.model.id).subscribe(
        res => {
          this.getAll();
          this.initializeFormValue();
          this.message = "Leave Application Updated"
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
          this.message = 'New Leave Application Created'
        }
      )
    }
  }

  getAll(): any {
    this.service.getList().subscribe(
      res => {
        this.leaveAppList = res.content;
        this.dataSource = new MatTableDataSource(this.leaveAppList);
      }
    )
    console.log(this.dataSource);
  }

    delete(row: LeaveApp): any {
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

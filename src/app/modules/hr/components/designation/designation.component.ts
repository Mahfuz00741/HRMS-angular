import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Designation} from "../../models/designation";
import {DesignationService} from "../../services/designation.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  desgList: Designation[] = new Array();
  dataSource: MatTableDataSource<Designation> = new MatTableDataSource();
  displayedColumns = ['id', 'name', 'active', 'action'];
  designationForm: FormGroup;
  model: Designation = new Designation();
  message: string;

  constructor(
    private service: DesignationService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.initializeFormValue();
  }

  initializeFormValue(): any {
    this.designationForm = this.formBuilder.group(
      {
        id: [],
        name: ['', [Validators.required]],
        active: ['true', Validators.required],
      }
    )
  }

  edit(row: Designation): any {
    this.designationForm = this.formBuilder.group(
      {
        id: [row.id],
        name: [row.name, [Validators.required]],
        active: [row.active, [Validators.required]],
      }
    )
  }

  generateModel(isCreate: boolean): any {
    if (isCreate) {
      this.model.id = undefined!;

    } else {
      this.model.id = this.designationForm.value.id;
    }
    this.model.name = this.designationForm.value.name;
    this.model.active = this.designationForm.value.active;
  }

  getAll(): any {
    this.service.getList().subscribe(
      res => {
        this.desgList = res.content;
        this.dataSource = new MatTableDataSource(this.desgList);
      }
    )
  }

  submit(): any {
    if (this.designationForm.value.id) {
      this.generateModel(false);
      this.service.update(this.model, this.model.id).subscribe(res => {
        this.getAll();
        this.message = "Updated"
        this.initializeFormValue()
      }, error => {
        console.log(error);
      });
    } else {
      this.generateModel(true);
      this.service.create(this.model).subscribe(res => {
        this.getAll();
        this.message = "Created"
        this.initializeFormValue()
      }, error => {
        console.log(error);
      });
    }
  }

  delete(row: Designation): any {
    this.service.delete(row.id).subscribe(
      res => {
        this.getAll();
        this.message = "Deleted"
        this.initializeFormValue();
      },
      error => {
        console.log('error');
      }
    )
  }

  clear() {
    this.initializeFormValue();
    this.message = "";
  }
}

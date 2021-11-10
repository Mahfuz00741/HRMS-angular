import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Report} from "../../models/report";
import {ReportService} from "../../services/report.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  /*property*/
  message: string;
  reportForm: FormGroup;
  model: Report = new Report();

  disableSelect = new FormControl(false);

  reportName: any[] = [
    {id: 1, name: 'Employee Department', value: 'ListOfEmployeeDepartment.jrxml'},
    {id: 2, name: 'Employee Designation', value: 'ListOfEmployeeDesignation.jrxml'},
    {id: 3, name: 'Leave Summary Employee', value: 'AllEmployeeLeaveSummaryDepartment.jrxml'}
  ];
  reportFormat: string[] = [
    'pdf',
    'xls',
  ];

  dropdownSelectValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: ReportService,
  ) {
  }

  ngOnInit(): void {
    this.initFormValue();
  }

  /*helper*/
  initFormValue(): void {
    this.reportForm = this.formBuilder.group(
      {
        format: ['', ''],
        name: ['', ''],
        department: ['', ''],
        designation: ['', ''],
        hr_department: ['', ''],
        fromDate: ['', ''],
        toDate: ['', ''],
      }
    )
  }

  onNameChange(): void{
    const selectValue = this.reportForm.value.name;
    if (selectValue){
      console.log(selectValue.id);
      this.dropdownSelectValue = selectValue;
    }else{
      this.dropdownSelectValue = null;
    }
  }

  printReport(): any {

    const params = new Map<string, object>();

    params.set('P_DEPT_ID', this.reportForm.value.department );
    params.set('P_DESG_ID', this.reportForm.value.designation );
    params.set('FROM_DATE', this.reportForm.value.fromDate );
    params.set('TO_DATE', this.reportForm.value.toDate );

    const convertAsJavaMap = {};
    params.forEach((val: object, key: string) => {
      // @ts-ignore
      convertAsJavaMap[key] = val;
    });

    this.model.format = this.reportForm.value.format;
    this.model.name = this.reportForm.value.name.value;
    this.model.params = convertAsJavaMap;

    this.service.printReport(this.model).subscribe(blob => {
      window.open(window.URL.createObjectURL(blob));
    }, error => {
      console.log(error);
    });
  }

}

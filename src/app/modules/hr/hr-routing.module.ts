import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DesignationComponent} from "./components/designation/designation.component";
import {DepartmentComponent} from "./components/department/department.component";
import {EmployeeComponent} from "./components/employee/employee.component";

const routes: Routes = [
  {path: '', component: DesignationComponent},
  {path: 'dept', component: DepartmentComponent},
  {path: 'emp', component: EmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }

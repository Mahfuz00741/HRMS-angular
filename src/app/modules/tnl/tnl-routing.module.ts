import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeaveTypeComponent} from "./components/leave-type/leave-type.component";
import {LeaveAppAdminComponent} from "./components/leave-app/leave-app-admin.component";

const routes: Routes = [
  {path: '', component: LeaveTypeComponent},
  {path: 'leaveAppAdmin', component: LeaveAppAdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TnlRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeaveTypeComponent} from "./components/leave-type/leave-type.component";

const routes: Routes = [
  {path: '', component: LeaveTypeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TnlRoutingModule { }

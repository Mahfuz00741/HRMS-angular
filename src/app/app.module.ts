import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveTypeComponent } from './modules/tnl/components/leave-type/leave-type.component';
import { LeaveAppComponent } from './modules/tnl/components/leave-app/leave-app.component';
import { EmployeeComponent } from './modules/hr/components/employee/employee.component';
import { DepartmentComponent } from './modules/hr/components/department/department.component';
import {HrModule} from "./modules/hr/hr.module";
import {TnlModule} from "./modules/tnl/tnl.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LeaveTypeComponent,
    LeaveAppComponent,
    EmployeeComponent,
    DepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HrModule,
    TnlModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

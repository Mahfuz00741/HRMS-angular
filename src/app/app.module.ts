import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LeaveTypeComponent} from './modules/tnl/components/leave-type/leave-type.component';
import {LeaveAppAdminComponent} from './modules/tnl/components/leave-app/leave-app-admin.component';
import {EmployeeComponent} from './modules/hr/components/employee/employee.component';
import {DepartmentComponent} from './modules/hr/components/department/department.component';
import {HrModule} from "./modules/hr/hr.module";
import {TnlModule} from "./modules/tnl/tnl.module";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {UserComponent} from './modules/admin/components/user/user.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { ReportComponent } from './modules/report/components/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaveTypeComponent,
    LeaveAppAdminComponent,
    EmployeeComponent,
    DepartmentComponent,
    LoginComponent,
    UserComponent,
    RegistrationComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HrModule,
    TnlModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

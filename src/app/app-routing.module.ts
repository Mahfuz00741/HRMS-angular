import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'hr', loadChildren: () => import('./modules/hr/hr.module').then(m => m.HrModule)},
  {path: 'tnl', loadChildren: () => import('./modules/tnl/tnl.module').then(m => m.TnlModule)},
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path: 'report', loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

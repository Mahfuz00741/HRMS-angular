import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./modules/components/login/login.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'hr', loadChildren: () => import('./modules/hr/hr.module').then(m => m.HrModule)},
  {path: 'tnl', loadChildren: () => import('./modules/tnl/tnl.module').then(m => m.TnlModule)},
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

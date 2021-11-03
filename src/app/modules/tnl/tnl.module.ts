import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TnlRoutingModule } from './tnl-routing.module';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TnlRoutingModule,
    MatTableModule,
    MatIconModule
  ]
})
export class TnlModule { }

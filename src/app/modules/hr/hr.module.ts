import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { DesignationComponent } from './components/designation/designation.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    DesignationComponent
  ],
    imports: [
        CommonModule,
        HrRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        NgbAlertModule,
    ]
})
export class HrModule { }

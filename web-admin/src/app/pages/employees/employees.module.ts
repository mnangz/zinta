import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbTabsetModule, NbSelectModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesTableComponent } from './employees-table/employees-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EmployeeComponent } from './employee/employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [EmployeesComponent, EmployeesTableComponent, EmployeeComponent],
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbDialogModule,
    NbTabsetModule,
    NbSelectModule,
    NbEvaIconsModule,
    CommonModule,
    MatMenuModule,
    EmployeesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule { }

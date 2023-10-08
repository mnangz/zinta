import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbTabsetModule, NbSelectModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveComponent } from './leave.component';
import { LeaveTableComponent } from './leave-table/leave-table.component';
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
import { LeaveFormComponent } from './leave/leave.component';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [LeaveComponent, LeaveTableComponent, LeaveFormComponent],
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
    LeaveRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ]
})
export class LeaveModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbTabsetModule, NbDatepickerModule } from '@nebular/theme';

import { VisitorsRoutingModule } from './visitors-routing.module';
import { VisitorsComponent } from './visitors.component';
import { VisitorsTableComponent } from './visitors-table/visitors-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableFilterModule } from 'mat-table-filter';



@NgModule({
  declarations: [VisitorsComponent, VisitorsTableComponent],
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbTabsetModule,
    NbDatepickerModule,
    CommonModule,
    VisitorsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableExporterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatTableFilterModule,
  ],
  providers:[ { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } ]
})
export class VisitorsModule { }

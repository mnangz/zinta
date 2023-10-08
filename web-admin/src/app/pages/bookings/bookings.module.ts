import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';

import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingsComponent } from './bookings.component';
import { BookingsTableComponent, NotesComponent } from './bookings-table/bookings-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BookingComponent } from './booking/booking.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ExportAsModule } from 'ngx-export-as';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import { HelloComponent } from './hello.component';


@NgModule({
  declarations: [BookingsComponent, BookingsTableComponent, BookingComponent, HelloComponent, NotesComponent],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    NbInputModule,
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
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBarcodeModule,
    ExportAsModule,
    MatTableExporterModule,
  ],
  entryComponents:[BookingComponent],
  providers:[ { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } ]
})
export class BookingsModule { }

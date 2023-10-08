import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbInputModule } from '@nebular/theme';

import { CurVisitorsRoutingModule } from './cur-visitors-routing.module';
import { CurVisitorsComponent } from './cur-visitors.component';
import { CurVisitorsTableComponent } from './cur-visitors-table/cur-visitors-table.component';
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


@NgModule({
  declarations: [CurVisitorsComponent, CurVisitorsTableComponent],
  imports: [
    CommonModule,
    CurVisitorsRoutingModule,
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
  ]
})
export class CurVisitorsModule { }

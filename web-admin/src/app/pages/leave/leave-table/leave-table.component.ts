import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { LeaveTableItem } from './leave-table-datasource';
import { LeaveService } from './../../../services/leave.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LeaveFormComponent } from './../leave/leave.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'leave-table',
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.css']
})
export class LeaveTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<LeaveTableItem>;
  LEAVE_DATA : LeaveTableItem[];
  dataSource = new MatTableDataSource<LeaveTableItem>(this.LEAVE_DATA);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['employee', 'email', 'start_date', 'end_date', 'actions'];

  constructor(private leaveService: LeaveService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getLeave();
    console.log(this.dataSource.data)
  }

  async getLeave() {
    await this.leaveService.allLeaves()
      .subscribe(res => this.dataSource.data=res as LeaveTableItem[]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onCreate() {
    this.leaveService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(LeaveFormComponent,dialogConfig);
  }

  onEdit(row){
    this.leaveService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(LeaveFormComponent,dialogConfig);
  }

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
    this.leaveService.removeLeave(id).subscribe();
    this.notificationService.warn('! Deleted successfully');
    }

    this.ngOnInit();
  }

}

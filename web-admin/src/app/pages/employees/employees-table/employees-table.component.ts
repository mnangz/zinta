import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmployeesTableItem } from './employees-table-datasource';
import { EmployeesService } from './../../../services/employees.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EmployeeComponent } from './../employee/employee.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EmployeesTableItem>;
  EMPLOYEES_DATA : EmployeesTableItem[];
  dataSource = new MatTableDataSource<EmployeesTableItem>(this.EMPLOYEES_DATA);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['username', 'first_name', 'last_name', 'email', 'position', 'employment_type', 'start_date', 'end_date', 'isHR', 'actions'];

  constructor(private employeesService: EmployeesService,
              private dialog: MatDialog,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.getEmployees();
  }

  async getEmployees() {
    await this.employeesService.allEmployees()
      .subscribe(res => this.dataSource.data=res as EmployeesTableItem[]);

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
    this.employeesService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onEdit(row){
    this.employeesService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }

  onDelete(id){
    if(confirm('Are you sure to delete this record ?')){
    this.employeesService.removeEmployee(id).subscribe();
    this.notificationService.warn('! Deleted successfully');
    }

    this.ngOnInit();
  }

}

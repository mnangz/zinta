import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { VisitorsService } from '../../../services/visitors.service';
import { VisitorsTableDataSource, VisitorsTableItem } from './visitors-table-datasource';
import { DatePipe } from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import { MatTableFilter } from 'mat-table-filter';
import { CustomExporter } from './custom-exporter';

export class VisitorsTableItem2 {
  _id: string;
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  company_name: string;
  address: string;
  id_number: string;
  vehicle_reg: string;
  purpose_of_visit: string;
  person_visited: string;
  visitor_seen: boolean;
  createdAt: Date;
  updatedAt: Date;
}


@Component({
  selector: 'visitors-table',
  templateUrl: './visitors-table.component.html',
  styleUrls: ['./visitors-table.component.css']
})
export class VisitorsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<VisitorsTableItem>;
  VISITORS_DATA : VisitorsTableItem[];
  dataSource = new MatTableDataSource<VisitorsTableItem>(this.VISITORS_DATA);


  filterEntity: VisitorsTableItem;
  filterType: MatTableFilter;

  customExporter: CustomExporter;

  myDate = new Date();
  todayDate: any;

  filterForm = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl(),
  });

  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['visitor_seen', 'first_name', 'last_name', 'mobile', 'email', 'company_name', 'address', 'id_number', 'vehicle_reg', 'purpose_of_visit', 'date_visited', 'signin_time', 'signout_date', 'signout_time'];

  constructor(private visitorService: VisitorsService, public datepipe: DatePipe) {
    this.todayDate = this.datepipe.transform(this.myDate, 'dd-MM-yyyy');
  }

  ngOnInit() {
    this.filterEntity = new VisitorsTableItem2();
    this.filterType = MatTableFilter.ANYWHERE;

    this.customExporter = new CustomExporter();
    this.getVisitors();
  }

  async getVisitors() {
    await this.visitorService.allVisitors()
      .subscribe(res => this.dataSource.data=res as VisitorsTableItem[]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDateFilter() {
    this.dataSource.filter = "" + Math.random();
    console.log(this.dataSource.filter);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

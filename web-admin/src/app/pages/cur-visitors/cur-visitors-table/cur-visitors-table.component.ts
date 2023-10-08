import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CurVisitorsTableDataSource, CurVisitorsTableItem } from './cur-visitors-table-datasource';
import { VisitorsService} from './../../../services/visitors.service';
import { NotificationService } from '../../../services/notification.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'cur-visitors-table',
  templateUrl: './cur-visitors-table.component.html',
  styleUrls: ['./cur-visitors-table.component.css']
})
export class CurVisitorsTableComponent implements AfterViewInit, OnInit {
  // @Output() public visitorId = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CurVisitorsTableItem>;
  VISITORS_DATA : CurVisitorsTableItem[];
  dataSource = new MatTableDataSource<CurVisitorsTableItem>(this.VISITORS_DATA);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['first_name', 'last_name', 'email', 'mobile', 'id_number', 'sign_in_time', 'date', 'actions'];

  constructor(public visitorsService: VisitorsService,
    public notificationService: NotificationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getVisitors();
  }

  refresh() {
    this.ngOnInit();
  }

  async getVisitors() {
    await this.visitorsService.visitorsCurrentlySignedIn()
      .subscribe(res => this.dataSource.data=res as CurVisitorsTableItem[]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  // signoutDialog(id) {
  //   this.dialog.open(SignoutComponent);
  //   this.visitorId.emit(id);
  // }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async signout(id) {
    if(confirm('Sign out visitor?')){
      await this.visitorsService.visitorSignOut(id).subscribe();
      this.notificationService.success('! Signed out successfully');
    }

    await this.delay(1000);

    this.ngOnInit();
  }
}

// @Component({
//   selector: 'sign-out',
//   templateUrl: './signout.component.html',
// })
// export class SignoutComponent extends CurVisitorsTableComponent {

//   @Input() visitorId : any;

//   constructor(visitorsService: VisitorsService,
//     notificationService: NotificationService,
//     dialog: MatDialog) {
//       super(visitorsService, notificationService, dialog);
//     }

//   signout() {
//     if(confirm('Sign out visitor?')){
//       this.visitorsService.visitorSignOut(this.visitorId).subscribe();
//       this.notificationService.success('! Signed out successfully');
//     }

//     this.ngOnInit();
//   }
// }

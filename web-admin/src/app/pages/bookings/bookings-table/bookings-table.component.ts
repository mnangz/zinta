import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BookingService } from 'app/services/booking.service';
import { BookingsTableItem } from './bookings-table-datasource';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { BookingComponent } from './../booking/booking.component';
import { DataService } from 'app/services/data.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import * as html2pdf from 'html2pdf.js';
import * as html2canvas from 'html2canvas';
import { NotificationService } from 'app/services/notification.service';
import { Router } from '@angular/router';
import { VisitorsService } from '../../../services/visitors.service';
import { CustomExporter } from './custom-exporter';

const visit_date = new Date();

@Component({
  selector: 'bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css']
})
export class BookingsTableComponent implements AfterViewInit, OnInit {
  @Output() public notes = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<BookingsTableItem>;
  BOOKINGS_DATA : BookingsTableItem[];
  dataSource = new MatTableDataSource<BookingsTableItem>(this.BOOKINGS_DATA);
  booking_ref_no: any;
  barcode: any;
  created_code = null;
  bookingInfo = null;
  booking: any;
  rangeFilter:any;
  todays_date:any;
  stringDate:any;
  customExporter: CustomExporter;

  get data():any {
    return this.dataService.data;
  }

  set data(bookingInfo: any) {
    this.dataService.data = bookingInfo;
  }


  bar_data = {
    "booking_ref_no" : "",
  }

  elementType: 'url' | 'img' | 'canvas' = 'canvas';
  textAlign: 'center';
  marginLeft: 'auto';
  marginRight: 'auto';

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'element',
  }

  fromDate = new Date();
  toDate = new Date();

  //   pipe: DatePipe;

  // filterForm = new FormGroup({
  //     fromDate: new FormControl(),
  //     toDate: new FormControl(),
  // });

  // get fromDate() { return this.filterForm.get('fromDate').value; }
  // get toDate() { return this.filterForm.get('toDate').value; }


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['booking_ref_no', 'first_name', 'last_name', 'mobile', 'email', 'company_name', 'address', 'id_number', 'vehicle_reg', 'purpose_of_visit', 'visit_date', 'actions'];

  constructor(private bookingService: BookingService,
              private dialog: MatDialog,
              private dataService: DataService,
              private notificationService: NotificationService,
              private visitorsService: VisitorsService,
              private router: Router,
              private changeDetectorRefs: ChangeDetectorRef,
              private exportAsService: ExportAsService,
              public datepipe: DatePipe) {
    //             this.dataSource.filterPredicate =
    // (data, filter: string) => !filter || data.visit_date.includes(filter);
    }

  ngOnInit() {

    var min = Math.ceil(10000);
    var max = Math.floor(99999);
    var randNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    this.todays_date = Date.now;
    console.log(this.todays_date);

    this.booking_ref_no = `ES${randNumber}`;

    this.customExporter = new CustomExporter();

    this.generateBarcode();

    this.getBookings();
  }

  refresh() {
    this.ngOnInit();
  }

  async getBookings() {
    await this.bookingService.allBookings()
      .subscribe(res => this.dataSource.data=res as BookingsTableItem[]);
  }

  async getBooking(id) {
    await this.bookingService.getBooking(id)
      .subscribe(res => {
        this.booking = res;
      }, err => {
        console.log(err);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyDateFilter() {
    console.log(this.fromDate)
    this.dataSource.data = this.dataSource.data.filter(
          x =>
          new Date(x.visit_date) >= new Date(this.fromDate) &&
          new Date(x.visit_date) <= new Date(this.toDate)
        )
    // this.dataSource = new MatTableDataSource<BookingsTableItem>(
    //   this.BOOKINGS_DATA.filter(
    //     x =>
    //       new Date(x.visit_date) >= new Date(this.fromDate) &&
    //       new Date(x.visit_date) <= new Date(this.toDate)
    //   )
    // );
    console.log(this.dataSource.data)
    // console.log(this.filterForm.value);
    // this.dataSource.filter = "" + Math.random();
    // this.dataSource.filterPredicate = (data, filter) =>{
    //   if (this.fromDate && this.toDate) {
    //     this.stringDate = this.datepipe.transform(data.visit_date, 'dd-MM-yyyy');
    //     return this.stringDate >= this.fromDate && this.stringDate <= this.toDate;
    //   }
    //   return true;
    // }
  }

  formateDate(visitors_date: Date) {
    return (
      visitors_date.getDate() + "/" + (visitors_date.getMonth() + 1) + "/" + visitors_date.getFullYear()
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onCreate() {
    this.bookingService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "80%";
    this.dialog.open(BookingComponent,dialogConfig);
  }

  onEdit(row){
    this.bookingService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "80%";
    this.dialog.open(BookingComponent,dialogConfig);
  }

  onSignin(visitor){
    if(confirm('Are you sure to sign visitor in?')){
      this.bookingService.removeBooking(visitor._id).subscribe();
      this.visitorsService.visitorSignin(visitor).subscribe();
      this.notificationService.success('Visitor successfully signed in.');
      // this.notesDialog(visitor.notes);
      }
      this.ngOnInit();
  }

  notesDialog(notes) {
    this.notes.emit(notes);
    this.dialog.open(NotesComponent);
  }

  addEvent(filterValue: string, event) {
    if (event.value != undefined) {
      filterValue = this.datepipe.transform(filterValue, 'dd/MM/yyyy');
    }
    this.dataSource.filter = filterValue.trim();
  }

  generateBarcode(){
    this.bar_data = this.booking_ref_no;

    this.created_code = JSON.stringify(this.bar_data);
  }

  processBarcode() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();

    this.barcode = imageData;

    this.bookingInfo = {booking_ref_no: '', barcode: ''}
    this.bookingInfo.booking_ref_no = this.booking_ref_no;
    this.bookingInfo.barcode = this.barcode;

    this.data = this.bookingInfo;

    this.onCreate();
  }

  resend(booking) {
    console.log(booking)
    // this.bookingService.sendMail(booking).subscribe();
    // this.notificationService.success('Email sent');
  }

  async downloadBooking(id) {

   await  this.getBooking(id);

      var element = document.getElementById('booking');
      console.log(element)
      // var opt = {
      //   margin:       1,
      //   filename:     'myfile.pdf',
      //   image:        { type: 'jpeg', quality: 0.98 },
      //   html2canvas:  { scale: 9, scrollY: -40, allowTaint: true, y: -100 },
      //   jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      // };

      // // New Promise-based usage:
      // html2pdf().from(element).set(opt).save();
  }
}


@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
})
export class NotesComponent {

  @Input() notes : any;



}

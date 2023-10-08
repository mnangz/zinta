import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { BookingService } from '../../../services/booking.service';
import { NotificationService } from '../../../services/notification.service';
import { DataService } from 'app/services/data.service';
import { CompanyService } from 'app/services/company.service';
import { VisitorsService } from 'app/services/visitors.service';
import { Router } from '@angular/router';
import { EmployeesService } from 'app/services/employees.service';


@Component({
  selector: 'ngx-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  hide = true;
  booking_ref_no: any;
  barcode: any;
  bookingInfo: any;
  ourCompany:any;
  company: any;
  employee: any;
  bookingEmail: any;
  booking_made_by:any;
  disable = false;

  get data():any {
    return this.dataService.data;
  }

  constructor(public service: BookingService,
    private notificationService: NotificationService,
    private dataService: DataService,
    private router: Router,
    private visitorsService: VisitorsService,
    private employeeService: EmployeesService,
    public dialogRef: MatDialogRef<BookingComponent>,
    private companyService: CompanyService) { }
  ngOnInit(): void {
    if (!this.service.form.get('_id').value) {
      this.booking_ref_no = this.data.booking_ref_no;
      this.barcode = this.data.barcode;
    }else{
      this.booking_ref_no = this.service.form.get('booking_ref_no').value;
      this.barcode = this.service.form.get('barcode').value;
    }

    this.getCompanyInfo();
    this.getStaff();
  }

  async getCompanyInfo() {
    await this.companyService.getCompany()
      .subscribe(res => {
        this.ourCompany = res;
      }, err => {
        console.log(err);
      });
  }

  async getStaff(){
    await this.employeeService.allEmployees()
    .subscribe(res => {
      this.employee = res;
    }, err => {
      console.log(err);
    });
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Form cleared successfully');
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async onSubmit() {
    this.disable = true;
    if (this.service.form.valid) {
      if (!this.service.form.get('_id').value) {
        this.service.makeBooking(this.service.form.value).subscribe();
      }else{
        this.service.update(this.service.form.value).subscribe();
      }
      this.notificationService.success(':: Booking Successful');
      await this.delay(4000);
      this.onClose();
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}

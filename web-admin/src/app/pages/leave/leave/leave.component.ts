import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { LeaveService } from '../../../services/leave.service';
import { EmployeesService } from 'app/services/employees.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'ngx-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveFormComponent implements OnInit {

  locations: any;
  employee: any;
  hide = true;

  constructor(public service: LeaveService,
    private router: Router,
    private notificationService: NotificationService,
    private employeeService: EmployeesService,
    public dialogRef: MatDialogRef<LeaveFormComponent>,) { }

  ngOnInit(): void {
    this.getStaff();
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
    if (this.service.form.valid) {
      if (!this.service.form.get('_id').value) {
      this.service.makeLeave(this.service.form.value).subscribe();
      } else {
      this.service.update(this.service.form.value).subscribe();
      }
      this.notificationService.success(':: Success');
      await this.delay(5000);
      this.onClose();
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }
  }

  onClose() {
    this.dialogRef.close();
    this.service.form.reset();
    this.service.initializeFormGroup();
  }


}

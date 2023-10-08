import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { EmployeesService } from '../../../services/employees.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  locations: any;
  hide = true;

  constructor(public service: EmployeesService,
    private router: Router,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EmployeeComponent>,) { }



  ngOnInit() {
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
      this.service.register(this.service.form.value).subscribe();
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

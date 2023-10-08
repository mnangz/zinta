import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notification.service';
import { CompanyService } from '../../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  constructor(public service: CompanyService,
    private notificationService: NotificationService,
    private router: Router,
    public dialogRef: MatDialogRef<CompanyInfoComponent>,) { }

  ngOnInit(): void {
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Form cleared successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      this.service.changeCompanyInfo(this.service.form.value).subscribe();
      this.notificationService.success(':: Success');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
    let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }

}

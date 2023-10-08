import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CompanyService } from 'app/services/company.service';
import { CompanyInfoComponent } from './company-info/company-info.component';

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  company: any;

  constructor(private companyService: CompanyService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCompanyInfo();
  }

  async getCompanyInfo() {
    await this.companyService.getCompany()
      .subscribe(res => {
        this.company = res;
      }, err => {
        console.log(err);
      });
  }

  onEditCompany(company){
    this.companyService.populateForm(company);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(CompanyInfoComponent,dialogConfig);
  }

}

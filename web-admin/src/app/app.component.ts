/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { CompanyService } from './services/company.service';
// import * as fs from 'fs';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  company: any;

  constructor(private analytics: AnalyticsService, private seoService: SeoService, private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  async getCompanyInfo() {
    await this.companyService.getCompany()
      .subscribe(res => {
        this.company = res;
        this.getLogo();
      }, err => {
        console.log(err);
      });
  }

  getLogo(){
    // var matches = this.company.company_logo.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    //   response = {type: '', data: null};

    //   if (matches.length !== 3) {
    //   return new Error('Invalid input string');
    //   }

    //   response.type = matches[1];
    //   response.data = new Buffer(matches[2], 'base64');
    //   let decodedImg = response;
    //   let imageBuffer = decodedImg.data;
    //   let fileName = `logo.png`;
    //   try {
    //   fs.writeFileSync("logo/" + fileName, imageBuffer, 'utf8');
    //   console.log("barcode generated");
    //   } catch (e) {
    //     console.log(e);
    //   }
  }
}

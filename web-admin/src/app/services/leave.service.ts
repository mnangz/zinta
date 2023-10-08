import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  staff: any;
  url = environment.url;
  company_id: any;
  staff_id: any;

  constructor(private http: HttpClient, private authService: NbAuthService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.staff = token.getPayload();
          this.company_id = this.staff.company;
          this.staff_id = this.staff.id;
        }

      });
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  allLeaves(): Observable<any> {
    return this.http.get(`${this.url}/api/leaves`, httpOptions).pipe(
      map(this.extractData),
    );
  }

  makeLeave(credentials) {
    return this.http.post(`${this.url}/api/leave/${this.company_id}/create/${this.staff_id}`, credentials, httpOptions);
  }

  sendMail(credentials) {
    console.log('in send mail function');
    return this.http.post(`${this.url}/api/sendmail`, credentials);
  }

  removeLeave(id) {
    return this.http.delete(`${this.url}/api/leave/delete/${id}`, id);
  }

  getLeave(id) {
    return this.http.get(`${this.url}/api/leave/${id}`, id);
  }

  update(credentials) {
    return this.http.patch(`${this.url}/api/leave/edit`, credentials);
  }

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    employee: new FormControl(''),
    email: new FormControl(''),
    start_date: new FormControl(null),
    end_date: new FormControl(null),
    __v: new FormControl(null),
  });

  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      employee: '',
      email: '',
      start_date: null,
      end_date: null,
      __v: null,
    });
  }

  populateForm(leave) {
    this.form.patchValue(leave);
  }
}

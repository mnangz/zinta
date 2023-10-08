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
export class BookingService {

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

  allBookings(): Observable<any> {
    return this.http.get(`${this.url}/api/bookings/${this.company_id}`, httpOptions).pipe(
      map(this.extractData),
    );
  }

  makeBooking(credentials) {
    return this.http.post(`${this.url}/api/booking/${this.company_id}/create/${this.staff_id}`, credentials, httpOptions);
  }

  sendMail(credentials) {
    console.log('in send mail function');
    return this.http.post(`${this.url}/api/sendmail`, credentials);
  }

  removeBooking(id) {
    return this.http.delete(`${this.url}/api/booking/delete/${id}`, id);
  }

  getBooking(id) {
    return this.http.get(`${this.url}/api/booking/${id}`, id);
  }

  update(credentials) {
    return this.http.patch(`${this.url}/api/booking/edit`, credentials);
  }

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    mobile: new FormControl(''),
    email: new FormControl(''),
    company_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    id_number: new FormControl('', Validators.required),
    vehicle_reg: new FormControl(''),
    purpose_of_visit: new FormControl('', Validators.required),
    person_visited: new FormControl('', Validators.required),
    visit_date: new FormControl(new Date(), Validators.required),
    booking_ref_no: new FormControl(null),
    barcode: new FormControl(''),
    notes: new FormControl(''),
    our_company_name: new FormControl(null),
    our_company_logo: new FormControl(null),
    company: new FormControl(null),
    booking_made_by: new FormControl(null),
    __v: new FormControl(null),
    date_booking_made: new FormControl(null),
  });

  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      first_name: '',
      last_name: '',
      mobile: '',
      email: '',
      company_name: '',
      address: '',
      id_number: '',
      vehicle_reg: '',
      person_visited: '',
      purpose_of_visit: '',
      visit_date: new Date(),
      booking_ref_no: '',
      barcode: '',
      notes: '',
      our_company_name: '',
      our_company_logo: '',
      company: null,
      booking_made_by: null,
      __v: null,
      date_booking_made: null,
    });
  }

  populateForm(booking) {
    this.form.patchValue(booking);
  }
}

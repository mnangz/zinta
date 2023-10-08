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
export class VisitorsService {

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

  allVisitors(): Observable<any> {
    return this.http.get(`${this.url}/api/visitors/${this.company_id}`, httpOptions).pipe(
      map(this.extractData),
    );
  }

  visitorSignin(credentials) {
    return this.http.post(`${this.url}/api/visitor/${this.company_id}/create/${this.staff_id}`, credentials);
  }

  getVisitor(id){
    return this.http.get(`${this.url}/api/visitor/${id}`);
  }

  visitorSignOut(id){
    return this.http.patch(`${this.url}/api/visitor/signout/${id}`, id);
  }

  visitorsCurrentlySignedIn(): Observable<any> {
    return this.http.get(`${this.url}/api/visitors/currently-signed-in/${this.company_id}`, httpOptions).pipe(
      map(this.extractData),
    );
  }

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    mobile: new FormControl('',),
    email: new FormControl('',),
    company_name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    id_number: new FormControl('', Validators.required),
    vehicle_reg: new FormControl('',),
    purpose_of_visit: new FormControl('', Validators.required),
    person_visited: new FormControl('', Validators.required),
    visit_date: new FormControl('', Validators.required),
    __v: new FormControl(null),
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
      __v: null,
    });
  }


}

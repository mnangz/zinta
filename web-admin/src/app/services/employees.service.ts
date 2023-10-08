import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

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
          this.staff_id = this.staff._id;
        }

      });
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  allEmployees(): Observable<any> {
    return this.http.get(`${this.url}/api/staff/${this.company_id}`, httpOptions).pipe(
      map(this.extractData),
    );
  }

  register(credentials) {
    return this.http.post(`${this.url}/api/staff/${this.company_id}/register`, credentials);
  }

  update(credentials) {
    return this.http.patch(`${this.url}/api//staff/edit`, credentials);
  }

  removeEmployee(id) {
    return this.http.delete(`${this.url}/api/staff/delete/${id}`, id);
  }

  form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    username: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    employment_type: new FormControl('', Validators.required),
    start_date: new FormControl(null, Validators.required),
    end_date: new FormControl(null, Validators.required),
    isHR: new FormControl(0, Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    __v: new FormControl(null),
  });

  initializeFormGroup() {
    this.form.setValue({
      _id: null,
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      position: '',
      employment_type: '',
      start_date: null,
      end_date: null,
      isHR: 0,
      password: '',
      __v: null,
    });
  }

  populateForm(employee) {
    this.form.patchValue(employee);
  }

}

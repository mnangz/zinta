import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken, NbLoginComponent, NbLogoutComponent, NbTokenService } from '@nebular/auth';


@Component({
  selector: 'ngx-login',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  constructor(private nbTokenService:NbTokenService, private authService: NbAuthService, private router: Router) {
    }

  ngOnInit(){
    this.logout();
  }

  logout(){

    this.nbTokenService.clear()
    this.router.navigate(['auth/login']);
    console.log('logged out')
  }

}

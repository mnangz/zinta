import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { AuthGuard } from './../services/auth.guard';

@Injectable()
export class AdminGuard implements CanActivate {

  user: any;

  constructor(
    private auth: AuthGuard,
    private router: Router,
    private authService: NbAuthService
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        }

      });
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user.isAdmin) {
      return true;
    }
    this.router.navigate(['/pages/bookings']);
    return false;
  }

}

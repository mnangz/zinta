/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbInputModule,
} from '@nebular/theme';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { BookingComponent } from './pages/bookings/booking/booking.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthGuard } from './services/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { MatDialogModule } from '@angular/material/dialog';
import { ExportAsModule } from 'ngx-export-as';
import { CompanyInfoComponent } from './pages/company/company-info/company-info.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ExportAsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    NbInputModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'username',

          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },

          baseEndpoint: 'http://localhost:5100',
          login: {
            endpoint: '/api/staff/login',
            method: 'post',
            redirect: {
              success: '/pages/bookings',
              failure: null,
            },
          },
          logout: {
            endpoint: '/auth/sign-out',
            method: 'post',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 200, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'username',  // strategy id key.
          // rememberMe: true,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          }
        },
        validation: {
          password: {
            required: true,
            minLength: 6,
            maxLength: 50,
          },
          fullName: {
            required: false,
            maxLength: 50,
          },
        }
      },
    })
  ],
  providers: [
    MatDatepickerModule,
    AuthGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents:[BookingComponent, CompanyInfoComponent],
})
export class AppModule {
}

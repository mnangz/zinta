import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CompanyService } from 'app/services/company.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  company: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Log out', link: 'auth/logout' } ];

  base64image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF62lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wNi0wNVQwMDoyNjoxMCswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDgtMzFUMDU6NTk6MzMrMDI6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDgtMzFUMDU6NTk6MzMrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODUwMGUxZjMtNzkxMC0wMTRmLWEwMDAtMGI1MjAzZWEwMDE0IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NTcwZGUwOWEtNTAzNS03MDQxLThmYzItNjBhZTZmYTJiNjQzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGE4NDVjNTQtMTIxMi0zYTRjLWFlYWItMjYyYmNhYWM3MzFmIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0YTg0NWM1NC0xMjEyLTNhNGMtYWVhYi0yNjJiY2FhYzczMWYiIHN0RXZ0OndoZW49IjIwMjAtMDYtMDVUMDA6MjY6MTArMDI6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjg1MDBlMWYzLTc5MTAtMDE0Zi1hMDAwLTBiNTIwM2VhMDAxNCIgc3RFdnQ6d2hlbj0iMjAyMC0wOC0zMVQwNTo1OTozMyswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Ks+UAAAAOvUlEQVR4nO3deZAU5R3G8e8ilyBGjqgIFsQjq4tGvBFRwWg0MUl5pEw8KoliouVBKZZHYgKriSQS1DLe0fWIkWh5RBOPqInxioqCGg+QGFERwQNQURA53Pzx663dZWfe6Z7p7ren+/lUTVnIbPdvmnm2++337fdtaG1tRURK6+a7AJEsU0BEHBQQEQcFRMRBARFxUEBEHBQQEQcFRMRBARFxUEBEHBQQEQcFRMRBARFxUEBEHBQQEYfuvgtoamzxXULShgCNwJbA0OA1GBgI9Ac2AtYHegQv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'

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService,
              private companyService: CompanyService) {

      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        }

      });
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}

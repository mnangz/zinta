import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminGuard } from './../auth/admin.guard';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'bookings',
      loadChildren: () => import('./bookings/bookings.module')
      .then(m => m.BookingsModule)
    },
    {
      path: 'cur_visitors',
      loadChildren: () => import('./cur-visitors/cur-visitors.module')
      .then(m => m.CurVisitorsModule)
    },
    {
      path: 'leave',
      loadChildren: () => import('./leave/leave.module')
      .then(m => m.LeaveModule),
      canActivate: [AdminGuard]
    },
    {
      path: 'employees',
      loadChildren: () => import('./employees/employees.module')
      .then(m => m.EmployeesModule),
      canActivate: [AdminGuard]
    },
    {
      path: 'visitors',
      loadChildren: () => import('./visitors/visitors.module')
      .then(m => m.VisitorsModule),
      canActivate: [AdminGuard]
    },
    {
      path: 'company',
      loadChildren: () => import('./company/company.module')
      .then(m => m.CompanyModule),
      canActivate: [AdminGuard]
    },
    {
      path: '',
      redirectTo: 'bookings',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
},
  { path: 'pages/dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'pages/leave', loadChildren: () => import('./leave/leave.module').then(m => m.LeaveModule) },



  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

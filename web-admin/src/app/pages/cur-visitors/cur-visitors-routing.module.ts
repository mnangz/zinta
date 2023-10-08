import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurVisitorsComponent } from './cur-visitors.component';

const routes: Routes = [{ path: '', component: CurVisitorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurVisitorsRoutingModule { }

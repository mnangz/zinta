import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorsComponent } from './visitors.component';

const routes: Routes = [{ path: '', component: VisitorsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorsRoutingModule { }

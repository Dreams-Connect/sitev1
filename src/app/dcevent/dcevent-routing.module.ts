import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DceventPage } from './dcevent.page';

const routes: Routes = [
  {
    path: '',
    component: DceventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DceventPageRoutingModule {}

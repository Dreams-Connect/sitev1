import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DcbooksPage } from './dcbooks.page';

const routes: Routes = [
  {
    path: '',
    component: DcbooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DcbooksPageRoutingModule {}

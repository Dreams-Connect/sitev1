import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerPage } from './employer.page';

const routes: Routes = [
  {
    path: '',
    component: EmployerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerPageRoutingModule {}

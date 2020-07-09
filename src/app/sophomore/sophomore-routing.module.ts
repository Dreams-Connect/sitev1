import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SophomorePage } from './sophomore.page';

const routes: Routes = [
  {
    path: '',
    component: SophomorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SophomorePageRoutingModule {}

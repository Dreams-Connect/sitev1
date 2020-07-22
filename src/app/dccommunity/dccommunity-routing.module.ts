import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DccommunityPage } from './dccommunity.page';

const routes: Routes = [
  {
    path: '',
    component: DccommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DccommunityPageRoutingModule {}

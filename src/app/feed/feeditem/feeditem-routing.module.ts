import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeeditemPage } from './feeditem.page';

const routes: Routes = [
  {
    path: '',
    component: FeeditemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeeditemPageRoutingModule {}

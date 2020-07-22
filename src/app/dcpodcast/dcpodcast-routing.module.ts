import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DcpodcastPage } from './dcpodcast.page';

const routes: Routes = [
  {
    path: '',
    component: DcpodcastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DcpodcastPageRoutingModule {}

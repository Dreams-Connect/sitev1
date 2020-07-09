import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentproviderPage } from './contentprovider.page';

const routes: Routes = [
  {
    path: '',
    component: ContentproviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentproviderPageRoutingModule {}

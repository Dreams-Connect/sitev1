import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityPage } from './community.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityPage
  },
  {
    path: 'feed',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./feed/feed.module').then(m => m.FeedPageModule),

      }
    ]
  },
  {
    path: 'createpost',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./createpost/createpost.module').then(m => m.CreatepostPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityPageRoutingModule { }

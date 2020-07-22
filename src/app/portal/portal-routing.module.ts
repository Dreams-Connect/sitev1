import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalPage } from './portal.page';
import { PortalGuard } from './auth/portal.guard';

const routes: Routes = [
  {
    path: '',
    component: PortalPage,
    children: [
      {
        path: 'dccommunity',
        loadChildren: () => import('./../dccommunity/dccommunity.module').then(m => m.DccommunityPageModule),
        canLoad: [PortalGuard]
      },
      {
        path: 'dcevent',
        loadChildren: () => import('./../dcevent/dcevent.module').then(m => m.DceventPageModule),
        canLoad: [PortalGuard]
      },
      {
        path: 'dccourses',
        loadChildren: () => import('./../dccourses/dccourses.module').then(m => m.DccoursesPageModule),
        canLoad: [PortalGuard]
      },
      {
        path: 'dcpodcast',
        loadChildren: () => import('./../dcpodcast/dcpodcast.module').then(m => m.DcpodcastPageModule),
        canLoad: [PortalGuard]
      },
      {
        path: 'dcbooks',
        loadChildren: () => import('./../dcbooks/dcbooks.module').then(m => m.DcbooksPageModule),
        canLoad: [PortalGuard]
      },
      {
        path: 'updateform',
        children: [
          {
            path: ':id',
            loadChildren: () => import('./../updateform/updateform.module').then(m => m.UpdateformPageModule),
            canLoad: [PortalGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/portal/dccommunity',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/portal/dccommunity',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalPageRoutingModule { }

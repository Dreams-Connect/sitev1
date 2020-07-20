import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'community',
        loadChildren: () => import('../community/community.module').then(m => m.CommunityPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'events',
        loadChildren: () => import('../all-event/all-event.module').then(m => m.AllEventPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'courses',
        loadChildren: () => import('../courses/courses.module').then(m => m.CoursesPageModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'jobs',
        loadChildren: () => import('../jobs/jobs.module').then(m => m.JobsPageModule),
        canLoad: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }

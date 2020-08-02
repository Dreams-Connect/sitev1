import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PortalGuard } from './portal/auth/portal.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'dc',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'dc/feed',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./event-category/event-category.module').then(m => m.EventCategoryPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'events',
    loadChildren: () => import('./all-event/all-event.module').then(m => m.AllEventPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'event',
    children: [
      {
        path: ':eventId',
        loadChildren: () => import('./selected-event/selected-event.module').then(m => m.SelectedEventPageModule),
        canLoad: [AuthGuard]
      }
    ],
    canLoad: [AuthGuard]
  },
  {
    path: 'new',
    loadChildren: () => import('./create-event/create-event.module').then(m => m.CreateEventPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'community',
    loadChildren: () => import('./community/community.module').then(m => m.CommunityPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./feed/feed.module').then(m => m.FeedPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'feeditem/:id',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./feed/feeditem/feeditem.module').then(m => m.FeeditemPageModule),
        canLoad: [AuthGuard]
      }
    ]
  },
  {
    path: 'cp',
    loadChildren: () => import('./contentprovider/contentprovider.module').then(m => m.ContentproviderPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'employer',
    loadChildren: () => import('./employer/employer.module').then(m => m.EmployerPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'podcast',
    loadChildren: () => import('./podcast/podcast.module').then(m => m.PodcastPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then(m => m.BooksPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'sophomore',
    loadChildren: () => import('./sophomore/sophomore.module').then(m => m.SophomorePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profilesettings',
    loadChildren: () => import('./profilesettings/profilesettings.module').then(m => m.ProfilesettingsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'portal',
    loadChildren: () => import('./portal/portal.module').then(m => m.PortalPageModule),
    
  },
  {
    path: 'access',
    loadChildren: () => import('./portal/auth/auth/auth.module').then(m => m.AuthPageModule)
  },
  // {
  //   path: 'dccommunity',
  //   loadChildren: () => import('./dccommunity/dccommunity.module').then(m => m.DccommunityPageModule),
  //   canLoad: [PortalGuard]
  // },
  // {
  //   path: 'dcevent',
  //   loadChildren: () => import('./dcevent/dcevent.module').then(m => m.DceventPageModule),
  //   canLoad: [PortalGuard]
  // },
  // {
  //   path: 'dccourses',
  //   loadChildren: () => import('./dccourses/dccourses.module').then(m => m.DccoursesPageModule),
  //   canLoad: [PortalGuard]
  // },
  // {
  //   path: 'dcpodcast',
  //   loadChildren: () => import('./dcpodcast/dcpodcast.module').then(m => m.DcpodcastPageModule),
  //   canLoad: [PortalGuard]
  // },
  // {
  //   path: 'dcbooks',
  //   loadChildren: () => import('./dcbooks/dcbooks.module').then(m => m.DcbooksPageModule),
  //   canLoad: [PortalGuard]
  // },
  // {
  //   path: 'updateform',
  //   children: [
  //     {
  //       path: ':id',
  //       loadChildren: () => import('./updateform/updateform.module').then(m => m.UpdateformPageModule),
  //       canLoad: [PortalGuard]
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

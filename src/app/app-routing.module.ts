import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./event-category/event-category.module').then( m => m.EventCategoryPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./all-event/all-event.module').then( m => m.AllEventPageModule)
  },
  { 
    path: 'event',
    children: [
      {
        path:':eventId',
        loadChildren: () => import('./selected-event/selected-event.module').then( m => m.SelectedEventPageModule)
      }
    ]
    
  },
  {
    path: 'new',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

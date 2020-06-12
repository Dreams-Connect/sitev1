import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedEventPage } from './selected-event.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedEventPage
  },
  {
    path: 'ticket',
    loadChildren: () => import('./ticket/ticket.module').then( m => m.TicketPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedEventPageRoutingModule {}

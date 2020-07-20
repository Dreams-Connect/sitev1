import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesettingsPage } from './profilesettings.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilesettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesettingsPageRoutingModule {}

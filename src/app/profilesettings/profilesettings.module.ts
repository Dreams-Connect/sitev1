import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilesettingsPageRoutingModule } from './profilesettings-routing.module';

import { ProfilesettingsPage } from './profilesettings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilesettingsPageRoutingModule
  ],
  declarations: [ProfilesettingsPage]
})
export class ProfilesettingsPageModule {}

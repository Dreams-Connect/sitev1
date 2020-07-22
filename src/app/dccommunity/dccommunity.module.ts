import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DccommunityPageRoutingModule } from './dccommunity-routing.module';

import { DccommunityPage } from './dccommunity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DccommunityPageRoutingModule
  ],
  declarations: [DccommunityPage]
})
export class DccommunityPageModule {}

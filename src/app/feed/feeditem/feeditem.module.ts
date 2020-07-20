import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeeditemPageRoutingModule } from './feeditem-routing.module';

import { FeeditemPage } from './feeditem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeeditemPageRoutingModule
  ],
  declarations: [FeeditemPage]
})
export class FeeditemPageModule {}

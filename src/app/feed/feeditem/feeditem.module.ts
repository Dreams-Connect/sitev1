import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeeditemPageRoutingModule } from './feeditem-routing.module';

import { FeeditemPage } from './feeditem.page';

import { MomentModule } from 'ngx-moment';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeeditemPageRoutingModule,
    MomentModule,
    SharedModule
  ],
  declarations: [FeeditemPage]
})
export class FeeditemPageModule { }

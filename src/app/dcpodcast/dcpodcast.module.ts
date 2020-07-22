import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DcpodcastPageRoutingModule } from './dcpodcast-routing.module';

import { DcpodcastPage } from './dcpodcast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DcpodcastPageRoutingModule
  ],
  declarations: [DcpodcastPage]
})
export class DcpodcastPageModule {}

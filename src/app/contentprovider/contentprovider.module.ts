import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentproviderPageRoutingModule } from './contentprovider-routing.module';

import { ContentproviderPage } from './contentprovider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentproviderPageRoutingModule
  ],
  declarations: [ContentproviderPage]
})
export class ContentproviderPageModule {}

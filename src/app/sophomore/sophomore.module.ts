import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SophomorePageRoutingModule } from './sophomore-routing.module';

import { SophomorePage } from './sophomore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SophomorePageRoutingModule
  ],
  declarations: [SophomorePage]
})
export class SophomorePageModule {}

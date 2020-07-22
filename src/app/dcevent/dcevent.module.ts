import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DceventPageRoutingModule } from './dcevent-routing.module';

import { DceventPage } from './dcevent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DceventPageRoutingModule
  ],
  declarations: [DceventPage]
})
export class DceventPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateformPageRoutingModule } from './updateform-routing.module';

import { UpdateformPage } from './updateform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateformPageRoutingModule
  ],
  declarations: [UpdateformPage]
})
export class UpdateformPageModule {}

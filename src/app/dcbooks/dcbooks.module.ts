import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DcbooksPageRoutingModule } from './dcbooks-routing.module';

import { DcbooksPage } from './dcbooks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DcbooksPageRoutingModule
  ],
  declarations: [DcbooksPage]
})
export class DcbooksPageModule {}

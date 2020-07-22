import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DccoursesPageRoutingModule } from './dccourses-routing.module';

import { DccoursesPage } from './dccourses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DccoursesPageRoutingModule
  ],
  declarations: [DccoursesPage]
})
export class DccoursesPageModule {}

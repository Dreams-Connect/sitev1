import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventCategoryPageRoutingModule } from './event-category-routing.module';

import { EventCategoryPage } from './event-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventCategoryPageRoutingModule
  ],
  declarations: [EventCategoryPage]
})
export class EventCategoryPageModule {}

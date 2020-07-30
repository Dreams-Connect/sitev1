import { LikesPipe } from './../pipes/likes.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [LikesPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    LikesPipe
  ]
})
export class SharedModule { }

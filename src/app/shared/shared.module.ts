import { LikesPipe } from './../pipes/likes.pipe';
import { ShorttimeagePipe } from './../pipes/shorttimeage.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [LikesPipe, ShorttimeagePipe],
  imports: [
    CommonModule,
  ],
  exports: [
    LikesPipe,
    ShorttimeagePipe
  ]
})
export class SharedModule { }

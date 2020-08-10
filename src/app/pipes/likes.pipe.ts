import { Pipe, PipeTransform, OnInit, OnDestroy } from '@angular/core';

@Pipe({
  name: 'likes'
})
export class LikesPipe implements PipeTransform {

  transform(postid: string) {
  }


}

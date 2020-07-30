import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likes'
})
export class LikesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

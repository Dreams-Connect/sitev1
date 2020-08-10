import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorttimeage'
})
export class ShorttimeagePipe implements PipeTransform {

  transform(time: string) {
    if (time == 'a few seconds') {
      return 'now'
    }
    if (time == 'an hour') {
      return '1 h'
    }
    if (time.includes('minutes')) {
      return time.replace(/minutes/gi, 'm')
    }
    if (time.includes('days')) {
      return time.replace(/days/gi, 'd')
    }
    if (time.includes('hours')) {
      return time.replace(/hours/gi, 'h')
    }
    return time
  }

}

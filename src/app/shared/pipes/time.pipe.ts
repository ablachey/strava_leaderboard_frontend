import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let h = 0;
    let m = 0;
    let s = 0;

    h = Math.floor(value / 3600);
    m = Math.floor((value - (h * 3600)) / 60);
    s = (value - h * 3600) - (m * 60);

    return this.leadingZero(h) + ':' + this.leadingZero(m) + ':' + this.leadingZero(s);
  }

  private leadingZero(v: number | string) {
    if(v < 10) {
      return '0' + v;
    }

    return v;
  }

}

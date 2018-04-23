import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value < 1000) {
      return value + 'm';
    }
    else if(value >= 1000) {
      let dist = Math.round((value / 1000) * 100) / 100;
      return dist + 'km';
    }
    
    return null;
  }

}

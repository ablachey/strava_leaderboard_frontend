import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calorie'
})
export class CaloriePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Math.round(value);
  }

}

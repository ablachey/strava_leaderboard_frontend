import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './time.pipe';
import { DistancePipe } from './distance.pipe';
import { CaloriePipe } from './calorie.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TimePipe, DistancePipe, CaloriePipe],
  exports: [TimePipe, DistancePipe, CaloriePipe]
})
export class PiperModule { }

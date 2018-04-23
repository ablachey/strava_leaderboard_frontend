import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardService } from './card.service';
import { TimePipe } from '../../shared/pipes/time.pipe';
import { DistancePipe } from '../../shared/pipes/distance.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CardComponent, TimePipe, DistancePipe],
  providers: [CardService]
})
export class CardModule { }

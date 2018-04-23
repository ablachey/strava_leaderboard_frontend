import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardService } from './card.service';
import { TimePipe } from '../../shared/pipes/time.pipe';
import { DistancePipe } from '../../shared/pipes/distance.pipe';
import { AlertModule } from '../../shared/alert/alert.module';

@NgModule({
  imports: [
    CommonModule,
    AlertModule
  ],
  declarations: [CardComponent, TimePipe, DistancePipe],
  providers: [CardService]
})
export class CardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardService } from './card.service';
import { AlertModule } from '../../shared/alert/alert.module';
import { PiperModule } from '../../shared/pipes/piper.module';

@NgModule({
  imports: [
    CommonModule,
    AlertModule,
    PiperModule
  ],
  declarations: [CardComponent],
  providers: [CardService]
})
export class CardModule { }

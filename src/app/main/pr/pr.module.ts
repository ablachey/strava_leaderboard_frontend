import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from '../../shared/alert/alert.module';
import { PiperModule } from '../../shared/pipes/piper.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PrService } from './pr.service';
import { PrComponent } from './pr.component';

@NgModule({
  imports: [
    CommonModule,
    AlertModule,
    PiperModule,
    AngularFontAwesomeModule
  ],
  declarations: [PrComponent],
  providers: [PrService]
})
export class PrModule { }

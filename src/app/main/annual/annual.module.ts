import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualService } from './annual.service';
import { AnnualComponent } from './annual.component';
import { AlertModule } from '../../shared/alert/alert.module';
import { PiperModule } from '../../shared/pipes/piper.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    AlertModule,
    PiperModule,
    AngularFontAwesomeModule,
    ChartsModule
  ],
  declarations: [AnnualComponent],
  providers: [AnnualService]
})
export class AnnualModule { }

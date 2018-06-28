import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { AlertModule } from '../../shared/alert/alert.module';
import { PiperModule } from '../../shared/pipes/piper.module';
import { ChartsModule } from 'ng2-charts';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AlertModule,
    PiperModule,
    ChartsModule,
    AngularFontAwesomeModule,
    RouterModule
  ],
  declarations: [ProfileComponent],
  providers: [ProfileService]
})
export class ProfileModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { AlertModule } from '../../shared/alert/alert.module';
import { PiperModule } from '../../shared/pipes/piper.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    AlertModule,
    PiperModule,
    ChartsModule
  ],
  declarations: [ProfileComponent],
  providers: [ProfileService]
})
export class ProfileModule { }

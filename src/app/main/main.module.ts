import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { BoardModule } from './board/board.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CardModule } from './card/card.module';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { ProfileModule } from './profile/profile.module';
import { PiperModule } from '../shared/pipes/piper.module';
import { ActivityModule } from './activity/activity.module';
import { PrModule } from './pr/pr.module';
import { AnnualModule } from './annual/annual.module';
import { ConnectionModule } from './connection/connection.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    BoardModule,
    AngularFontAwesomeModule,
    CardModule,
    ProfileModule,
    PiperModule,
    ActivityModule,
    PrModule,
    AnnualModule,
    ConnectionModule
  ],
  declarations: [MainComponent],
  providers: [AuthGuardService]
})
export class MainModule { }

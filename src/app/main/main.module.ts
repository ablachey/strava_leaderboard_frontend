import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { BoardModule } from './board/board.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CardModule } from './card/card.module';
import { AuthGuardService } from '../shared/guards/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    BoardModule,
    AngularFontAwesomeModule,
    CardModule
  ],
  declarations: [MainComponent],
  providers: [AuthGuardService]
})
export class MainModule { }

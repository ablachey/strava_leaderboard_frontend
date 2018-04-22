import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { BoardModule } from './board/board.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CardModule } from './card/card.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    BoardModule,
    AngularFontAwesomeModule,
    CardModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }

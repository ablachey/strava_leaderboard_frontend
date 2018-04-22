import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { BoardService } from './board.service';
import { AlertModule } from '../../shared/alert/alert.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    FormsModule,
    AlertModule,
    RouterModule
  ],
  declarations: [BoardComponent],
  providers: [BoardService]
})
export class BoardModule { }

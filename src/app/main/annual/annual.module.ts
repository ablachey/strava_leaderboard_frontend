import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualService } from './annual.service';
import { AnnualComponent } from './annual.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnnualComponent],
  providers: [AnnualService]
})
export class AnnualModule { }

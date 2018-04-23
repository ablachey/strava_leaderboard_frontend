import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { AuthGuardService } from '../shared/guards/auth-guard.service';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'boards', component: BoardComponent, data: {title: 'Boards'} 
      },
      {
        path: 'board/:id/cards', component: CardComponent, data: {title: 'Cards'} 
      },
      {
        path: '', redirectTo: '/boards', pathMatch: 'full'
      },
      { path: '**', redirectTo: '/boards', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class MainRoutingModule { }

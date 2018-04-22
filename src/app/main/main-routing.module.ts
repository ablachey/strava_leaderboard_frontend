import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BoardComponent } from './board/board.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'boards', component: BoardComponent, data: {title: 'Boards'}
      },
      {
        path: '', redirectTo: '/boards', pathMatch: 'full'
      }
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

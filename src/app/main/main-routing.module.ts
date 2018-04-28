import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}, children: [
          {
            path: 'boards', component: BoardComponent, data: {title: 'Boards'} 
          },
          {
            path: 'profile', component: ProfileComponent, data: {title: 'Profile'}
          }
        ]
      },
      {
        path: 'board/:id/cards', component: CardComponent, data: {title: 'Cards'} 
      },
      {
        path: '', redirectTo: '/dashboard/profile', pathMatch: 'full'
      },
      { path: '**', redirectTo: '/dashboard/profile', pathMatch: 'full'}
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

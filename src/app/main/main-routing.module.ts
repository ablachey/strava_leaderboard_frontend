import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { BoardJoinComponent } from './board/board-join/board-join.component';
import { BoardMyComponent } from './board/board-my/board-my.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivityListingComponent } from './activity/activity-listing/activity-listing.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'profile', component: ProfileComponent, data: {title: 'Profile'}
      },
      {
        path: 'boards', component: BoardComponent, data: {title: 'Boards'}, children: [
          {
            path: 'join', component: BoardJoinComponent, data: {title: 'Join'}
          },
          {
            path: 'my', component: BoardMyComponent, data: {title: 'My Boards'}
          },
          {
            path: '', redirectTo: 'my', pathMatch: 'full'
          },
        ]
      },
      {
        path: 'profiles/:id', component: ProfileComponent, data: {title: 'Athlete Profile'}
      },
      {
        path: 'boards/:id/cards', component: CardComponent, data: {title: 'Board Detail'} 
      },
      {
        path: 'activities', component: ActivityComponent, data: {title: 'Activities'}, children: [
          {
            path: 'recent', component: ActivityListingComponent, data: {title: 'Recent'}
          },
          {
            path: '', redirectTo: 'recent', pathMatch: 'full'
          }
        ]
      },
      {
        path: '', redirectTo: '/profile', pathMatch: 'full'
      },
      { path: '**', redirectTo: '/profile', pathMatch: 'full'}
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

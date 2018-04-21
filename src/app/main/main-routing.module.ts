import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}
      },
      {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
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

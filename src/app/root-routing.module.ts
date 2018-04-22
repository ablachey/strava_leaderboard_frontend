import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthenticateComponent } from './auth/authenticate/authenticate.component';
import { AuthorizeComponent } from './auth/authorize/authorize.component';

const routes: Routes = [
  { 
    path: 'auth', component: AuthComponent, children: [
      {
        path: '', component: AuthenticateComponent
      },
      {
        path: 'authorize', component: AuthorizeComponent
      }
    ]
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RootRoutingModule { }

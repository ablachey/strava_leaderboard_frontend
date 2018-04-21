import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { InnerComponent } from './login/inner.component';
import { AuthorizeComponent } from './login/authorize.component';

const routes: Routes = [
  { 
    path: 'login', component: LoginComponent, children: [
      {
        path: '', component: InnerComponent
      },
      {
        path: 'authorize', component: AuthorizeComponent
      }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RootRoutingModule { }

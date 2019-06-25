import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// guards
import {AuthGuard} from './shared/guards/auth.guard';
import {SigninGuard} from './shared/guards/signin.guard';

// components
import {LayoutComponent} from './layout/layout.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', loadChildren: './modules/messages/messages.module#MessagesModule'}
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

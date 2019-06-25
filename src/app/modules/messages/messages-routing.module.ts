import {RouterModule, Routes} from '@angular/router';
import {MessagesComponent} from './messages.component';
import {NgModule} from '@angular/core';

const MessagesRoutes: Routes = [
  {
    path: '',
    component: MessagesComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(MessagesRoutes)
  ]
})
export class MessagesRoutingModule {
}

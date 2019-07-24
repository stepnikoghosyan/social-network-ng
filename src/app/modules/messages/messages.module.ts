import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagesRoutingModule} from './messages-routing.module';

// services
import {SelectProfileInteractionService} from './services/select-profile-interaction.service';

// components
import {MessagesComponent} from './messages.component';
import {ProfilesListComponent} from './components/profiles-list/profiles-list.component';
import {SingleProfileComponent} from './components/single-profile/single-profile.component';
import {PrivateChatComponent} from './components/private-chat/private-chat.component';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';

@NgModule({
  declarations: [
    MessagesComponent,
    ProfilesListComponent,
    SingleProfileComponent,
    PrivateChatComponent,
    ActionMenuComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ],
  bootstrap: [
    MessagesComponent
  ],
  providers: [
    SelectProfileInteractionService
  ]
})
export class MessagesModule {
}

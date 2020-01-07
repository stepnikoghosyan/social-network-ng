import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// modules
import {HomepageRoutingModule} from './homepage-routing.module';

// components
import {HomepageComponent} from './homepage.component';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ],
  bootstrap: [HomepageComponent]
})
export class HomepageModule {
}

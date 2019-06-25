import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';

// guards
import {AuthGuard} from './shared/guards/auth.guard';
import {SigninGuard} from './shared/guards/signin.guard';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { TopNavBarComponent } from './shared/components/top-nav-bar/top-nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent,
    TopNavBarComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    // SharedModule,
  ],
  providers: [
    AuthGuard,
    SigninGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

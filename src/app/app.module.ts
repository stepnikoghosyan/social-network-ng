import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';

// guards
import {AuthGuard} from './shared/guards/auth.guard';
import {SigninGuard} from './shared/guards/signin.guard';

@NgModule({
  declarations: [
    AppComponent
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

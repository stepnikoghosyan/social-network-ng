import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';


// guards
import {AuthGuard} from './shared/guards/auth.guard';
import {SigninGuard} from './shared/guards/signin.guard';

// components
import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {BottomNavigationMenuComponent} from './shared/components/bottom-navigation-menu/bottom-navigation-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NotFoundComponent,
    BottomNavigationMenuComponent,
  ],
  imports: [
    FormsModule,
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

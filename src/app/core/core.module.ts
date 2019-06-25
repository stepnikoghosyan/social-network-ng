import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {TokenIntercepter} from '../shared/services/token.intercepter';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
  ],
  exports: [
    CommonModule,
    BrowserModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: 'Window',
          useValue: window,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenIntercepter,
          multi: true,
        },
      ]
    };
  }
}

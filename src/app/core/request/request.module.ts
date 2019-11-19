import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestService } from './service/request.service';
import { API_URL_TOKEN } from './request.token';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [],
})
export class RequestModule {
  public static forRoot(apiUrl?: string): ModuleWithProviders {
    return {
      ngModule: RequestModule,
      providers: [
        { provide: API_URL_TOKEN, useValue: apiUrl },
        { provide: HTTP_INTERCEPTORS, useClass: RequestService, multi: true }
      ]
    };
  }
}

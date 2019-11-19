import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLoginRoutingModule } from './login-routing.module';
import { MainComponent } from './main/main.component';

import { SharedModule } from '../shared/shared.module';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [MainComponent],
  imports: [
    AppLoginRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: [
    ApiService
  ]
})
export class LoginModule { }

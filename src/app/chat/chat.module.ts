import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';

import { AppChatRoutingModule } from './chat-routing.module';

import { SharedModule } from '../shared/shared.module';
import { StrPipe } from './pipes/str.pipe';
@NgModule({
  declarations: [MainComponent, StrPipe],
  imports: [
    CommonModule,
    SharedModule,
    AppChatRoutingModule
  ]
})
export class ChatModule { }

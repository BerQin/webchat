import { Component, OnInit } from '@angular/core';
import { PageService } from '@shared/services/page-data';
import { AuthService } from '@auth/auth.service';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private ws: WebSocket;
  public visible: boolean = false;
  constructor(
    public page: PageService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.connectWs();
  }

  logout() {
    this.auth.logout();
  }

  connectWs() {
    if (this.ws) {
      this.ws.close();
    }

    this.ws = new WebSocket('ws://127.0.0.1:8090/chat');
    const that  = this;
    this.ws.onopen = function (event) {
      that.ws.send('message');
    };
    this.ws.onmessage = function (event) {
      that.ws.send('message');
    };
    this.ws.onclose = function (event) {

    };
  }

  open() {
    this.visible = true;
  }
  close() {
    this.visible = false;
  }
}

import { Injectable } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService
  ) {
  }

  /**
   * 确认框
   * @param msg 提示文本
   */
  public confirm(msg: string): Observable<boolean> {
    return this.modalService.confirm({
      nzTitle: msg,
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => true,
    }).afterClose.pipe(filter(v => v === true));
  }

  /**
   * 确认框
   * @param msg 提示文本
   */
  public confirmed(msg: string): Observable<boolean> {
    return this.modalService.confirm({
      nzTitle: msg,
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => true,
    }).afterClose;
  }

  public alert(title: string, type: 'success' | 'warning' | 'error' | 'info' = 'info', content?: string): void {
    if (type) {
      this.notification.create(type, title, content);
    } else {
      this.notification.blank(title, content);
    }
  }
}

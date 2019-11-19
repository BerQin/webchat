import { Injectable, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

import { CookieService } from '@core/cookie';

import { PageService, PageApiService } from '@shared/services/page-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public QIHOO_LOGIN_URL: string;
  private getUserInfo$ = new Subject<any>();

  constructor(
    @Optional() private cookieservice: CookieService,
    private pageService: PageService,
    private router: Router,
    private pageApi: PageApiService
  ) {
  }

  public checkAsynAuth(): any {
    return new Promise((resolve, reject) => {
      this.pageApi.getUserCurrent().subscribe(res => {
        if (res.code === 1) {
          this.pageService.userInfo = res.data;
          resolve(true);
        }
      }, err => {
        this.qihooLogin();
      });
    });
  }

  /**
   * 登出方法
   */
  public logout() {
    this.pageApi.getLogout().subscribe((result: any) => {
      if (result.code === 1) {
        this.pageService.userInfo = null;
        this.qihooLogin();
      } else {
        alert(result.msg);
      }
    });
  }

  public qihooLogin() {
    this.router.navigate(['/login/main']);
  }
}

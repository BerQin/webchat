import { Injectable } from '@angular/core';
import { GET, POST, GET_DATA } from '@common/function/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertService } from '@shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class PageApiService {
  constructor(
    private http: HttpClient,
    private modal: AlertService
  ) {
  }

  @GET('/api/userinfo')
  public getUserCurrent(param?: any): Observable<any> {
    return null;
  }

  @GET('/api/logout')
  public getLogout(param?: any): Observable<any> {
    return null;
  }
}

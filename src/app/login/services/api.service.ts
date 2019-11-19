import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { POST, HttpOption } from '@common/function/http';
import { Observable } from 'rxjs';
import { AlertService } from '@shared/services/alert.service';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private modal: AlertService
  ) { }


  @POST('/api/login')
  public upLoginIn(param?: any, httpOptions?: HttpOption): Observable<any> {
    return null;
  }
}

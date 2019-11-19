import { HttpParams, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of, fromEvent } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { ResponseBody } from '@common/interface/http';
import { ThrowError } from './error.function';
import { HttpUtil } from '@common/class/http';

export interface HttpOption {
  headers?: HttpHeaders;
  reportProgress?: boolean;
  observe?: string;
  responseType?: 'json' | 'blob' | 'text' | 'arraybuffer';
  params?: HttpParams;
}

export function GET(url: string, errMsg?: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (params?: HttpOption): Observable<any> {
      return this.http.get(url, params).pipe(
        tap((result: ResponseBody<any>) => ThrowError(result, this)),
        catchError((err) => {
          if (this.modal) {
            (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
          }
          throw err;
        })
      );
    };
  };
}

export function GET_FILE(url: string, errMsg?: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (params?: HttpOption): Observable<any> {
      return this.http.get(url, params).pipe(
        switchMap((data: any) => {
          if (data.body.type === 'application/octet-stream') {
            return of(data);
          } else {
            const reader = new FileReader();
            reader.readAsText(data.body, 'utf-8');
            return fromEvent(reader, 'loadend').pipe(
              map((res: any) => {
                return JSON.parse(res.currentTarget.result);
              })
            );
          }
        })
      );
    };
  };
}

export function GET_DATA(url: string, errMsg?: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (params?: HttpOption): Observable<any> {
      return this.http.get(url, params).pipe(
        tap((result: ResponseBody<any>) => ThrowError(result, this)),
        map((res: ResponseBody<any>) => res.data),
        catchError((err) => {
          if (this.modal) {
            (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
          }
          throw err;
        })
      );
    };
  };
}

export function POST(url: string, errMsg?: string): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    descriptor.value = function (body, params?: HttpOption): Observable<any> {
      return this.http.post(url, body, params).pipe(
        tap((result: ResponseBody<any>) => ThrowError(result, this)),
        catchError((err) => {
          if (this.modal) {
            (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
          }
          throw err;
        })
      );
    };
  };
}

export function POST_DATA(url: string, errMsg?: string): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    descriptor.value = function (body, params?: HttpOption): Observable<any> {
      return this.http.post(url, body, params).pipe(
        tap((result: ResponseBody<any>) => ThrowError(result, this)),
        map((res: ResponseBody<any>) => res.data),
        catchError((err) => {
          if (this.modal) {
            (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
          }
          throw err;
        })
      );
    };
  };
}

export function DELETE(url: string, errMsg?: string): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (params?: HttpOption): Observable<any> {
      return this.http.delete(url, params).pipe(
        tap((result: ResponseBody<any>) => ThrowError(result, this)),
        catchError((err) => {
          if (this.modal) {
            (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
          }
          throw err;
        })
      );
    };
  };
}

export function PATCH(url: string, errMsg?: string): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (params?: HttpOption): Observable<any> {
      return this.http.patch(url, null, params).pipe(
        tap((result: ResponseBody<any>) => ThrowError(result, this)),
        catchError((err) => {
          if (this.modal) {
            (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
          }
          throw err;
        })
      );
    };
  };
}

export function PUT(url: string, errMsg?: string): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (body, params?: HttpOption): Observable<any> {
      return this.http.put(url, body, params).pipe(
        tap((result: ResponseBody<any>) => ThrowError(result, this)),
        catchError((err) => {
          if (this.modal) {
            (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
          }
          throw err;
        })
      );
    };
  };
}

export function REQUEST(method: 'POST' | 'GET', url: string, errMsg?: string): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    descriptor.value = function (formData, option: HttpOption): Observable<any> {
      if (this.http) {
        const req = new HttpRequest(method, url, formData, option);
        return this.http.request(req).pipe(
          tap((result: ResponseBody<any>) => ThrowError(result, this)),
          catchError((err) => {
            if (this.modal) {
              (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
            }
            throw err;
          })
        );
      } else {
        return of(null);
      }
    };
  };
}

export function GET_DATABASE(url: string, errMsg?: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (database: string, params?: HttpOption): Observable<any> {
      const api_url = url.replace(':database', database);
      return this.http.get(api_url, params).pipe(
        tap((result: ResponseBody<any>) => ThrowError(result, this)),
        catchError((err) => {
          if (this.modal) {
            (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
          }
          throw err;
        })
      );
    };
  };
}

export function PUT2(url: string, errMsg?: string): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.value = function (body?: any): Observable<any> {
      return this.http.put(url, body).pipe(
        tap((result: ResponseBody<any>) => ThrowError(result, this)),
        catchError((err) => {
          if (this.modal) {
            (<any>this.modal).alert(errMsg || err.msg, 'error', HttpUtil.errorMessage(err));
          }
          throw err;
        })
      );
    };
  };
}


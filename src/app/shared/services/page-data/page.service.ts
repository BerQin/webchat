import { Injectable, ElementRef } from '@angular/core';
import { Browser } from '@core/browser';
import * as JsEncryptModule from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  public contElement: ElementRef;
  public language: string = Browser.language || 'zh-CN';
  public userInfo: {
    name?: string;
  } = null;
  // tslint:disable-next-line: max-line-length
public publicKey = '-----BEGIN PUBLIC KEY-----\
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv/aIsZX9j/xWe6aKTleW\
u1RsCfmj1Gp16WB6K6YwrcahGLNk2+JxjDFPEO7gFQvKoW7CTHxHdviHuKdgIWcW\
6NLBFPzvaMvFzUzp+z1ZVuUQAXJvs3g/9YvDsr9njBIYlutjIL92c6UXB+rGwLF/\
MJMu/l126z4GdLiDYsUvXsquB8vKtGUOQSMOGLpDARywQfOi3ZI014OgHONi39BJ\
oABxEQ0u4kfafJX/PoPrB82tb3butuZiQbcu/xbwDbe9DVI0W+S8jcLFl1fUsTXL\
SdnEbg+X82qnFsYPy9gOU/I0o3oCAPfUqAgHcKK9dC8NgZ7jbp1P5UHk40nNsGs2\
VwIDAQAB\
-----END PUBLIC KEY-----\
';

  public encrypt = new JsEncryptModule.JSEncrypt();
  constructor() {
    this.encrypt.setPublicKey(this.publicKey);
  }
  getSignStr(str: string): string {
    return this.encrypt.encrypt(str);
  }

  getDecStr(str: string): string {
    return this.encrypt.decrypt(str);
  }
}

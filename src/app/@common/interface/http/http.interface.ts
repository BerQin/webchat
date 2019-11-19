/**
 * 公共response body
 */
export interface ResponseBody<T> {
  /** 错误代码 */
  code: number;

  /** 错误信息 */
  message: string;

  /** 数据 */
  data: T;
}

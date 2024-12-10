import type { AxiosRequestConfig } from 'axios'

export interface IResponseData<T = any> {
  errorCode: number
  msg: string
  data: T
}

export interface IRequestConfig extends AxiosRequestConfig {
  /** 是否显示loading */
  isShowLoading?: boolean
  /** 是否直接返回原始data */
  isRowData?: boolean
  /** 是否展示message */
  showMessage?: boolean
  /** show message文案 */
  showMessageText?: string
}

export enum ResultEnum {
  SUCCESS = '请求成功',
  UNKNOW_ERROR = '未知错误'
}

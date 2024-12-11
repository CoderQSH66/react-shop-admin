/**
 * @author: coderqsh
 * @description: 通用Request请求类
 * @CreateDate: 2024-12-09
 * @LastDate: 2024-12-09
 */

import type { AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios'
import { message as $message } from 'antd'
import axios from 'axios'
import type { IRequestConfig, IResponseData } from './type'
import { ResultEnum } from './type'

class Request {
  // axios请求实例
  private instance: AxiosInstance

  constructor(public config: CreateAxiosDefaults) {
    this.instance = axios.create(config)

    //  请求拦截器
    this.instance.interceptors.request.use((config) => {
      const { headers } = config
      const token = localStorage.getItem('token')
      if (token) {
        headers.token = token
      }
      return config
    }, (err) => {
      return Promise.reject(err)
    })

    // 响应拦截器
    this.instance.interceptors.response.use((res: AxiosResponse<IResponseData>) => {
      const { errorCode, msg } = res.data
      if (errorCode) {
        return Promise.reject(msg)
      }
      return res
    }, (err) => {
      return Promise.reject(err)
    })
  }

  /** request函数重载 */
  request<T = any>(requestConfig: IRequestConfig & { isRowData: false }): Promise<AxiosResponse<IResponseData<T>>>
  request<T = any>(requestConfig: IRequestConfig): Promise<AxiosResponse<IResponseData<T>>['data']>

  /** 通用reuqest方法 */
  request<T = any>(requestConfig: IRequestConfig) {
    const { isRowData = true, showMessage = false, showMessageText = ResultEnum.SUCCESS } = requestConfig
    return new Promise((reslove, reject) => {
      this.instance.request<IResponseData<T>>(requestConfig).then((res) => {
        showMessage && $message.success(showMessageText)
        if (isRowData) {
          reslove(res.data)
        }
        else {
          reslove(res.data)
        }
      }).catch((err) => {
        $message.error(err.message || err || ResultEnum.UNKNOW_ERROR)
        reject(err)
      })
    })
  }
}

const $request = new Request({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default $request

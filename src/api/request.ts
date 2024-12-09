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
        headers.setAuthorization(`Bearer ${localStorage.getItem('token')}`)
        return config
      }
      else {
        // window.location.href = '/'
        return Promise.reject(new Error('用户认证失败！'))
      }
    }, (err) => {
      return Promise.reject(err)
    })

    // 响应拦截器
    this.instance.interceptors.response.use((res: AxiosResponse<IResponseData>) => {
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
        console.log(err)
        showMessage && $message.error(err.message || ResultEnum.UNKNOW_ERROR)
        reject(err)
      })
    })
  }
}

const request = new Request({
  baseURL: '/mock',
  timeout: 10000
})

export default request

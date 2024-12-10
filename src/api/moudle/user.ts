import type { ILoginProps, ILoginReturnProps, IUserInfoProps } from '@/types'
import $request from '../request'

/** 登录接口 */
export function login(loginPros: ILoginProps) {
  return $request.request<ILoginReturnProps>({
    method: 'post',
    url: '/login',
    data: loginPros
  })
}

/** 获取用户信息 */
export function getUserInfo() {
  return $request.request<IUserInfoProps>({
    method: 'post',
    url: '/getinfo'
  })
}

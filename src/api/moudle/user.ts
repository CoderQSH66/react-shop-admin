import type { IAddUserProps, IUserList } from '@/types'
import $request from '../request'

/** 获取用户列表 */
export function getUserList({ limit = 10, page = 1, keyword = '', user_level_id = '' } = {
}) {
  return $request.request<IUserList>({
    method: 'get',
    url: `/user/${page}`,
    params: {
      limit,
      keyword,
      user_level_id
    }
  })
}

/** 修改用户状态 */
export function changeUserStatus(id: number, status: number) {
  return $request.request({
    method: 'post',
    url: `/user/${id}/update_status`,
    data: {
      status
    },
    showMessage: true,
    showMessageText: '修改用户状态成功！'
  })
}

/** 新增用户 */
export function addUser(user: IAddUserProps) {
  return $request.request({
    method: 'post',
    url: '/user',
    data: user
  })
}

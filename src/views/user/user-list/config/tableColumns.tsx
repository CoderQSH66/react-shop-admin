import type { ProColumns } from '@ant-design/pro-components'
import { Avatar, Badge } from 'antd'

export interface IUserProps {
  id: number
  avatar: string
  username: string
  nickame: string
  level: number
  registerDate: number
  status: number
  phone: number | null
  email: string
}
export const baseTableColumns: ProColumns<IUserProps>[] = [

  {
    title: '会员',
    dataIndex: 'username',
    key: 'username',
    valueType: 'text',
    fieldProps: {
      placeholder: '手机/会员/邮箱'
    },
    formItemProps: {
      label: '关键词'
    },
    render(_, entity) {
      return (
        <div className="info">
          <Avatar src={entity.avatar}></Avatar>
          <div className="user">
            <div className="nmae">{entity.username}</div>
            <div className="id">
              ID:
              {entity.id}
            </div>
          </div>
        </div>
      )
    }
  },
  {
    title: '会员等级',
    dataIndex: 'level',
    key: 'level',
    valueType: 'text'
  },
  {
    title: '登录注册',
    dataIndex: 'registerDate',
    key: 'registerDate',
    valueType: 'dateTime',
    hideInSearch: true,
    align: 'center',
    render(dom) {
      return (
        <div>
          注册时间：
          {dom}
        </div>
      )
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    valueType: 'switch',
    hideInSearch: true,
    render(_, entity) {
      return (
        <Badge status={entity.status ? 'success' : 'error'} text={entity.status ? '启用' : '禁用'}></Badge>
      )
    }
  }

]

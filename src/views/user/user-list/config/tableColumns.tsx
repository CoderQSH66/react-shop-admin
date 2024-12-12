import type { IUserProps } from '@/types'
import type { ProColumns } from '@ant-design/pro-components'
import { Avatar } from 'antd'

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
    dataIndex: 'user_level_id',
    key: 'user_level_id',
    valueType: 'select',
    valueEnum: {
      3: '普通会员',
      4: '白银会员',
      5: '黄金会员',
      6: '钻石会员'
    }
  },
  {
    title: '登录注册',
    dataIndex: 'update_time',
    key: 'update_time',
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
  }

]

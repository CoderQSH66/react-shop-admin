import BaseUpload from '@/components/base/upload'
import { type ProFormColumnsType, ProFormItem } from '@ant-design/pro-components'
import type { IUserProps } from './tableColumns'

export const schemeColumns: ProFormColumnsType<IUserProps>[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    valueType: 'text'
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
    valueType: 'password'
  },
  {
    title: '昵称',
    dataIndex: 'nickame',
    key: 'nickame',
    valueType: 'text'
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    key: 'avatar',
    renderFormItem() {
      return (

        <ProFormItem
          name="avatar"
          getValueFromEvent={(e) => {
            return e && e.file
          }}
          noStyle
        >
          <BaseUpload></BaseUpload>
        </ProFormItem>

      )
    }
  },
  {
    title: '会员等级',
    dataIndex: 'level',
    key: 'level',
    valueType: 'select',
    formItemProps: {
      getValueProps(value) {
        return {
          value: String(value)
        }
      }
    },
    valueEnum: {
      0: '普通会员',
      1: '白银会员',
      2: '黄金会员',
      3: '钻石会员'
    }
  },
  {
    title: '手机',
    dataIndex: 'phone',
    key: 'phone',
    valueType: 'text'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    valueType: 'text'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    valueType: 'switch'
  }
]

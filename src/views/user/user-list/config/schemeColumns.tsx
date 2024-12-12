import type { IAddUserProps } from '@/types'
import BaseUpload from '@/components/base/upload'
import { type ProFormColumnsType, ProFormItem } from '@ant-design/pro-components'

export const schemeColumns: ProFormColumnsType<IAddUserProps>[] = [
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
    dataIndex: 'nickname',
    key: 'nickname',
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
    dataIndex: 'user_level_id',
    key: 'user_level_id',
    valueType: 'select',
    formItemProps: {
      getValueProps(value) {
        return {
          value: value ? String(value) : '无'
        }
      }
    },
    valueEnum: {
      3: '普通会员',
      4: '白银会员',
      5: '黄金会员',
      6: '钻石会员'
    },
    initialValue: '3'
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
    valueType: 'switch',
    formItemProps: {
      normalize(value) {
        return Number(value)
      }
    }
  }
]

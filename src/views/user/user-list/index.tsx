import type { ProColumns, ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components'
import BaseUpload from '@/components/base/upload'
import { BetaSchemaForm, ProFormItem, ProTable } from '@ant-design/pro-components'
import { Avatar, Badge, Button, Space } from 'antd'
import { memo, useMemo, useRef, useState } from 'react'
import style from './style.module.less'

interface IUserProps {
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
const initValues: IUserProps = {
  id: 0,
  avatar: '',
  username: '',
  nickame: '',
  level: 0,
  registerDate: 0,
  status: 0,
  phone: null,
  email: ''
}

const baseColumns: ProColumns<IUserProps>[] = [

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

const dataSource: IUserProps[] = []
for (let i = 0; i < 30; i++) {
  dataSource.push({
    id: i,
    avatar: 'https://picsum.photos/200',
    username: `user${i}`,
    level: Number(i % 4),
    registerDate: Date.now(),
    status: Math.random() > 0.5 ? 1 : 0,
    nickame: `nickame${i}`,
    phone: 123456789,
    email: `email${i}@qq.com`
  })
}

const schemeColumns: ProFormColumnsType<IUserProps>[] = [
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

const index = memo(() => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const formRef = useRef<ProFormInstance>()
  const columns: ProColumns<IUserProps>[] = useMemo(() => {
    return [
      ...baseColumns,
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render(_, rocord) {
          return (
            <Space>
              <a onClick={() => {
                setOpenDrawer(true)
                formRef.current?.resetFields()
                formRef.current?.setFieldsValue(rocord)
              }}
              >
                编辑
              </a>
              <a style={{
                color: 'red'
              }}
              >
                删除
              </a>
            </Space>
          )
        }
      } as ProColumns<IUserProps>
    ]
  }, [])

  return (
    <div className={style.root}>

      <ProTable
        columns={columns}
        request={async (params) => {
          console.log(params)
          return {
            data: dataSource,
            success: true
          }
        }}
        pagination={
          {
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true
          }
        }
        headerTitle={(
          <Button
            type="dashed"
            onClick={() => {
              setOpenDrawer(true)
              formRef.current?.resetFields()
            }}
          >
            新增用户
          </Button>
        )}
      >
      </ProTable>
      <BetaSchemaForm
        initialValues={initValues}
        formRef={formRef}
        layoutType="DrawerForm"
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        drawerProps={{
          forceRender: true
        }}
        resize={{
          maxWidth: window.innerWidth * 0.8,
          minWidth: 500
        }}
        columns={schemeColumns}
        layout="horizontal"
        labelCol={{
          span: 4
        }}
        onFinish={async (values) => {
          console.log(values)
        }}
      >
      </BetaSchemaForm>
    </div>
  )
})

export default index

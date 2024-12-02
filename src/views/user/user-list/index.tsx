import type { ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { BetaSchemaForm, ProTable } from '@ant-design/pro-components'
import { Button, Space } from 'antd'
import { memo, useMemo, useRef, useState } from 'react'
import type { IUserProps } from './config/tableColumns'
import { schemeColumns } from './config/schemeColumns'
import { baseTableColumns } from './config/tableColumns'
import style from './style.module.less'

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

const index = memo(() => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const formRef = useRef<ProFormInstance>()
  const columns: ProColumns<IUserProps>[] = useMemo(() => {
    return [
      ...baseTableColumns,
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
        search={{
          labelWidth: 'auto'
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
            type="primary"
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

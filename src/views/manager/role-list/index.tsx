import type { ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { CoreModal } from '@/components/core/c-modal'
import waitTime from '@/utils/waitTime'
import { ProForm, ProFormSwitch, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components'
import { Button, Flex, Popconfirm, Space } from 'antd'
import classNames from 'classnames'
import { memo, useMemo, useRef, useState } from 'react'
import { tableColumns } from './config/tableColumns'
import style from './style.module.less'

interface IRole {
  id: number
  name: string
  desc: string
  status: number
}

const dataSource: IRole[] = []
for (let i = 0; i < 30; i++) {
  dataSource.push({
    id: i,
    name: `name${i}`,
    desc: `desc${i}`,
    status: Math.random() > 0.5 ? 1 : 0
  })
}

const index = memo(() => {
  const [visible, setVisible] = useState<boolean>(false)

  const formRef = useRef<ProFormInstance<IRole>>()

  const columns: ProColumns<IRole>[] = useMemo(() => {
    return [
      ...tableColumns,
      {
        title: '操作',
        valueType: 'option',
        width: '30%',
        align: 'center',
        render: (_, record) => [
          <Button key="rule" type="link">配置权限</Button>,
          <Button key="update" type="link" onClick={() => handleRoleInfo(false, record)}>编辑</Button>,
          //  antd删除确认提示框
          <Popconfirm
            key="remove"
            title="删除角色"
            description="确定删除该角色吗?"
          >
            <Button type="link">删除</Button>
          </Popconfirm>

        ]
      }
    ]
  }, [])

  const handleRoleInfo = (isAdd: boolean, record?: IRole) => {
    setVisible(true)
    if (isAdd) {
      formRef.current?.resetFields()
    }
    else {
      formRef.current?.setFieldsValue(record!)
    }
  }
  const onFinish = async () => {
    await waitTime()
    setVisible(false)
  }
  return (
    <div className={classNames(style.root, 'layout-bg')}>

      <ProTable
        columns={columns}
        request={async (params) => {
          console.log(params)
          await waitTime()
          return {
            data: dataSource,

            success: true
          }
        }}
        search={false}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 30]
        }}
        options={{
          reload: true,
          setting: false,
          density: false
        }}
        toolbar={{
          search: (
            <Button
              type="primary"
              onClick={() => {
                handleRoleInfo(true)
              }}
            >
              新增
            </Button>
          )
        }}
      >
      </ProTable>

      <CoreModal
        open={visible}
        onCancel={() => {
          setVisible(false)
        }}
        fullScreen={false}
        footer={false}
        title="新增角色"
      >
        <ProForm<IRole>
          name="role-form"
          formRef={formRef}
          layout="horizontal"
          labelCol={{
            span: 4
          }}
          onFinish={onFinish}
          submitter={{
            searchConfig: {
              resetText: '取消'
            },
            onReset() {
              setVisible(false)
            },
            render(_, dom) {
              return [
                <Flex key="footer" justify="end">
                  <Space>{dom}</Space>
                </Flex>
              ]
            }
          }}
        >
          <ProFormText
            label="角色名称"
            name="name"
            placeholder="请输入角色名称"
            rules={[{
              required: true,
              message: '角色名称必填'
            }]}
          >
          </ProFormText>
          <ProFormTextArea
            label="角色描述"
            name="desc"
            placeholder="请输入角色描述"
            fieldProps={{
              maxLength: 200,
              showCount: true
            }}
          >
          </ProFormTextArea>
          <ProFormSwitch label="状态" name="status"></ProFormSwitch>
        </ProForm>
      </CoreModal>
    </div>
  )
})

export default index

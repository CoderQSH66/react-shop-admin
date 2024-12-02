import type { ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { ProForm, ProFormDigit, ProFormItem, ProFormSwitch, ProFormText, ProTable } from '@ant-design/pro-components'
import { Button, Drawer, Space, Switch } from 'antd'
import { memo, useMemo, useRef, useState } from 'react'
import { tableColumns } from './config/tableColumns'

interface IVipLevel {
  id: number
  level: string
  order: number
  status: number
  discount: number
  max_price?: number
  max_times?: number
}

const dataSource: IVipLevel[] = []
for (let i = 0; i < 10; i++) {
  dataSource.push({
    id: i,
    level: `会员等级${i}`,
    order: i,
    status: Math.random() > 0.5 ? 1 : 0,
    discount: Math.floor(Math.random() * (100 - 0 + 1)),
    max_price: Math.floor(Math.random() * (100 - 0 + 1)),
    max_times: Math.floor(Math.random() * (100 - 0 + 1))
  })
}

const index = memo(() => {
  const [_, refresh] = useState(true)
  const [open, setOpen] = useState(false)
  const formRef = useRef<ProFormInstance<IVipLevel>>()
  const columns: ProColumns<IVipLevel>[] = useMemo(() => {
    return [
      ...tableColumns,
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        valueType: 'switch',
        render(_, entity) {
          return (
            // switch切换
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              checked={Boolean(entity.status)}
              key={entity.id}
              onChange={(checked) => {
                entity.status = Number(checked)
                refresh((old) => {
                  console.log(old)
                  return !old
                })
              }}
            >
            </Switch>
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        valueType: 'option',
        align: 'center',
        render(_, record) {
          return (
            <Space>
              <Button
                type="link"
                onClick={() => {
                  handleLevel(false, record)
                }}
              >
                修改
              </Button>
              <Button
                type="link"
                style={{
                  color: 'red'
                }}
              >
                删除
              </Button>
            </Space>
          )
        }
      }
    ]
  }, [])
  const handleLevel = (isAdd: boolean, record?: IVipLevel) => {
    setOpen(true)
    if (isAdd) {
      formRef.current?.resetFields()
    }
    else {
      formRef.current?.setFieldsValue(record!)
    }
  }
  return (
    <div>
      <ProTable
        columns={columns}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10
        }}
        dataSource={dataSource}
        toolbar={{
          search: (
            <Button
              type="primary"
              onClick={() => {
                handleLevel(true)
              }}
            >
              新增
            </Button>
          )
        }}
      >
      </ProTable>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="修改"
        footer={(
          <Space>
            <Button
              type="primary"
              onClick={async () => {
                const res = await formRef.current?.validateFields()
                console.log(res)
              }}
            >
              提交
            </Button>
            <Button type="dashed" onClick={() => setOpen(false)}>取消</Button>
          </Space>
        )}
        width={600}
      >
        <ProForm<IVipLevel>
          name="level-form"
          layout="horizontal"
          initialValues={{
            level: '',
            order: 100,
            status: true,
            max_price: 0,
            max_times: 0,
            discount: 0
          }}
          submitter={false}
          labelCol={{
            span: 4
          }}
          formRef={formRef}
        >
          <ProFormText
            label="等级名称"
            name="level"
            width="md"
            rules={[{
              required: true,
              message: '等级名称必填'
            }]}
          >
          </ProFormText>
          <ProFormDigit
            label="等级权重"
            name="order"
            width="md"
          >
          </ProFormDigit>

          <ProFormSwitch label="状态" name="status" width="md"></ProFormSwitch>
          <ProFormItem label="升级条件">
            <ProFormDigit
              width="sm"
              label={(
                <span style={{
                  fontSize: 13
                }}
                >
                  累计消费满
                </span>
              )}
              name="max_price"
              fieldProps={{
                addonAfter: '元'
              }}
              help={(
                <span style={{
                  fontSize: 11
                }}
                >
                  设置会员等级所需要的购买量必须大于等于0,单位：笔
                </span>
              )}
            >
            </ProFormDigit>
            <ProFormDigit
              width="sm"
              label={(
                <span style={{
                  fontSize: 13
                }}
                >
                  累计次数满
                </span>
              )}
              name="max_times"
              fieldProps={{
                addonAfter: '%'
              }}
              help={(
                <span style={{
                  fontSize: 11
                }}
                >
                  设置会员等级所需要的购买量必须大于等于0,单位：笔
                </span>
              )}
            >
            </ProFormDigit>
          </ProFormItem>
          <ProFormDigit label="折扣率(%)" name="discount" width="md"></ProFormDigit>
        </ProForm>
      </Drawer>
    </div>
  )
})

export default index

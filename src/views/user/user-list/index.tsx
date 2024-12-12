import type { IAddUserProps, IUserProps } from '@/types'
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { changeUserStatus, getUserList } from '@/api'
import { upladImg } from '@/api/moudle/image'
import { useHalfScroll } from '@/hooks/useHalfScroll'
import { BetaSchemaForm, ProTable } from '@ant-design/pro-components'
import { Button, Space, Switch } from 'antd'
import classNames from 'classnames'
import { memo, useMemo, useRef, useState } from 'react'
import { schemeColumns } from './config/schemeColumns'
import { baseTableColumns } from './config/tableColumns'
import style from './style.module.less'

const index = memo(() => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState<'新增' | '编辑'>('新增')
  const formRef = useRef<ProFormInstance>()
  const columns: ProColumns<IUserProps>[] = useMemo(() => {
    return [
      ...baseTableColumns,
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        valueType: 'switch',
        hideInSearch: true,
        render(_, entity) {
          return (
            <Switch
              value={Boolean(entity.status)}
              loading={loading}
              onChange={async (e) => {
                entity.status = Number(e)
                setLoading(true)
                await changeUserStatus(entity.id, e ? 1 : 0)
                setLoading(false)
              }}
            >
            </Switch>
          )
        }
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render(_, rocord) {
          return (
            <Space>
              <a onClick={() => {
                setOpenDrawer(true)
                setTitle('编辑')
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

  const onFinish = async (values: IAddUserProps) => {
    console.log(values)
    const { avatar } = values
    const res = avatar && (typeof avatar === 'object') && await upladImg(avatar)
    console.log(res)
  }
  const [scrollY] = useHalfScroll()

  return (
    <div className={classNames([style.root, 'user-root'])}>

      <ProTable
        className="pro-table"
        columns={columns}
        request={async (params) => {
          const { current: page, pageSize: limit, username: keyword = '', user_level_id = '' } = params
          const { data } = await getUserList({
            page,
            limit,
            keyword,
            user_level_id
          })
          return {
            data: data.list,
            total: data.totalCount,
            success: true
          }
        }}
        search={{
          labelWidth: 'auto'
        }}
        pagination={
          {
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: [5, 10, 20, 30]
          }
        }
        headerTitle={(
          <Button
            type="primary"
            onClick={() => {
              setOpenDrawer(true)
              setTitle('新增')
              formRef.current?.resetFields()
            }}
          >
            新增用户
          </Button>
        )}
        scroll={{
          x: 'max-content',
          y: scrollY
        }}
      >
      </ProTable>
      <BetaSchemaForm<IAddUserProps>
        formRef={formRef}
        layoutType="DrawerForm"
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        drawerProps={{
          forceRender: true,
          title
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
        onFinish={onFinish}
      >
      </BetaSchemaForm>
    </div>
  )
})

export default index

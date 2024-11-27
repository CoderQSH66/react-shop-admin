import type { MenuProps } from 'antd/lib'
import avatarJpg from '@/assets/img/avatar.jpg'
import { useCoreModal } from '@/components/core/c-modal'
import useFullscreen from '@/hooks/useFullscreen'
import { CompressOutlined, DownOutlined, ExpandOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Dropdown, Form, Input, Tooltip } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React, { memo, useState } from 'react'

interface IHeaderProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const index: React.FC<IHeaderProps> = memo(({ collapsed, setCollapsed }) => {
  const [form] = Form.useForm<{
    oldPassword: string
    newPassword: string
  }>()

  const UpdatePasswordFC: React.FC = () => (
    <Form
      form={form}
      name="reset-form"
      labelCol={{
        span: 6
      }}
      wrapperCol={{
        span: 14
      }}
    >
      <FormItem
        label="旧密码"
        name="oldPassword"
        rules={[{
          required: true,
          message: '请输入旧密码'
        }]}
      >
        <Input.Password />
      </FormItem>
      <FormItem
        label="新密码"
        name="newPassword"
        rules={[{
          required: true,
          message: '请输入新密码'
        }]}
      >
        <Input.Password />
      </FormItem>
      <FormItem
        label="确认密码"
        name="confirmPassword"
        rules={[{
          required: true,
          message: '请再次确认密码'
        }, ({ getFieldValue }) => {
          const newPassword = getFieldValue('newPassword')
          return {
            validator(_, value) {
              if (!value || newPassword === value) {
                return Promise.resolve()
              }
              else {
                return Promise.reject(new Error('两次输入的密码不一致'))
              }
            }
          }
        }]}
      >
        <Input.Password />
      </FormItem>
    </Form>
  )

  const { openModal, ContextHolder } = useCoreModal({
    title: '修改密码',
    onOk() {
      form.validateFields().then((res) => {
        console.log(res)
      })
    }
  }, <UpdatePasswordFC></UpdatePasswordFC>)

  const [title, setTitle] = useState<'折叠' | '展开'>('折叠')

  const setExpandMode = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed)
    setTitle(isCollapsed ? '展开' : '折叠')
  }

  // 下拉列表
  const items: MenuProps['items'] = [{
    key: '1',
    label: (
      <Button
        type="link"
        onClick={() => {
          openModal()
        }}
      >
        修改密码
      </Button>
    )
  }, {
    key: '2',
    label: (
      <Button type="link">退出登录</Button>
    )
  }]
  const [isFull, fullscreen, exitFullscreen] = useFullscreen()
  return (
    <div className="top-header">
      <div className="left">
        <Tooltip title={title}>
          {
            !collapsed
              ? (
                  <MenuFoldOutlined
                    style={{
                      fontSize: 20
                    }}
                    onClick={() => setExpandMode(true)}
                  />
                )
              : (
                  <MenuUnfoldOutlined
                    style={{
                      fontSize: 20
                    }}
                    onClick={() => setExpandMode(false)}
                  />
                )
          }

        </Tooltip>
      </div>
      <div className="right">
        <div className="box"></div>
        {/* 全屏 */}
        <div className="full-screen">
          {
            !isFull
              ? (
                  <Tooltip title="全屏">
                    <ExpandOutlined
                      style={{
                        fontSize: 20
                      }}
                      onClick={() => {
                        (fullscreen as any)()
                      }}
                    />
                  </Tooltip>
                )
              : (
                  <Tooltip title="退出全屏">
                    <CompressOutlined
                      style={{
                        fontSize: 20
                      }}
                      onClick={() => {
                        (exitFullscreen as any)()
                      }}
                    />
                  </Tooltip>
                )
          }

        </div>
        {/* 修改密码 */}
        <Dropdown menu={{
          items
        }}
        >
          <div className="profile">
            <div className="avatar">
              <img src={avatarJpg} alt="" />
            </div>

            <div className="name">coderqsh</div>
            <DownOutlined style={{
              marginTop: 3,
              marginLeft: 2,
              fontSize: 15
            }}
            />

          </div>
        </Dropdown>
      </div>

      <ContextHolder></ContextHolder>
    </div>
  )
})

export default index

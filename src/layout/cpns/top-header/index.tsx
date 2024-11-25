import type { MenuProps } from 'antd/lib'
import avatarJpg from '@/assets/img/avatar.jpg'
import useFullscreen from '@/hooks/useFullscreen'
import { DownOutlined, FullscreenExitOutlined, FullscreenOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { App, Button, Dropdown, Tooltip } from 'antd'
import React, { memo, useState } from 'react'

interface IHeaderProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const index: React.FC<IHeaderProps> = memo(({ collapsed, setCollapsed }) => {
  const { modal } = App.useApp()

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
          modal.confirm({
            cancelText: '取消',
            okText: '确定',
            icon: null,
            content: <h2>修改Miami</h2>,
            closable: true,
            maskClosable: true,
            onOk: async () => {
              await new Promise((reslove) => {
                setTimeout(() => {
                  reslove(true)
                }, 1000)
              })
            }
          })
        }}
      >
        修改密码
      </Button>
    )
  }, {
    key: '2',
    label: (
      <Button type="text">退出登录</Button>
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
                    <FullscreenOutlined
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
                    <FullscreenExitOutlined
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
    </div>
  )
})

export default index

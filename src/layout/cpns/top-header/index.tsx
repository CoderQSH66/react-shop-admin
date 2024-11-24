import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React, { memo, useState } from 'react'

interface IHeaderProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const index: React.FC<IHeaderProps> = memo(({ collapsed, setCollapsed }) => {
  const [title, setTitle] = useState<'折叠' | '展开'>('折叠')
  const setExpandMode = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed)
    setTitle(isCollapsed ? '展开' : '折叠')
  }
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
    </div>
  )
})

export default index

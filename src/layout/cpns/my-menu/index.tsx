import rootChildRoutes from '@/router/module'
import routesToMenus from '@/utils/routesToMenus'
import { Menu } from 'antd'
import React, { memo } from 'react'

const index = memo(() => {
  const items = routesToMenus(rootChildRoutes) as any
  return (
    <Menu
      className="my-menu"
      mode="inline"
      items={items}

    >
      index
    </Menu>
  )
})

export default index

import type { StateType } from '@/store'
import type { MenuProps } from 'antd'
import routesToMenus from '@/utils/routesToMenus'
import { Menu } from 'antd'
import { memo, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const getInitOpenkeys = (initKey: string, items: any[]) => {
  const keys: string[] = []
  const findItem = (items: any[]) => {
    return items.find((item) => {
      return item.key === initKey
    })
  }
  items.forEach((item) => {
    if (item.children && item.children.length > 0) {
      const info = findItem(item.children)
      if (info) {
        keys.push(item.key)
      }
    }
  })
  return keys
}

const index = memo(() => {
  const { menus } = useSelector((state: StateType) => ({
    menus: state.user.menus
  }), shallowEqual)
  // 获取菜单
  const items = routesToMenus(menus) as any

  // 路由切换
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])

  // 点击路由跳转
  const handleMenuClick: MenuProps['onClick'] = (menuInfo) => {
    const { key } = menuInfo
    setSelectedKeys([key])
    // 路由跳转
    navigate(key)
  }
  // 点击展开菜单
  const handleMenuChange: MenuProps['onOpenChange'] = (info) => {
    setOpenKeys([info.at(-1)!])
  }
  // 侦听初次路由的变化
  useEffect(() => {
    const openK = getInitOpenkeys(location.pathname, items)
    setSelectedKeys([location.pathname])
    setOpenKeys(openK)
  }, [])
  return (
    <Menu
      className="my-menu"
      mode="inline"
      items={items}
      onClick={handleMenuClick}
      onOpenChange={handleMenuChange}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
    >
    </Menu>
  )
})

export default index

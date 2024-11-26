import type { MenuProps } from 'antd'
import type { RouteObject } from 'react-router-dom'
import iconModules from '@/assets/icons'
import Icon from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

export default function routesToMenus(routes: RouteObject[]): Omit<MenuItem, 'type'>[] {
  return routes.map<Omit<MenuItem, 'type'>>((route) => {
    const IconRender = iconModules[route.meta?.icon as string]
    return {
      key: route.path,
      label: route.meta?.title,
      icon: IconRender
        ? (
            <Icon
              component={IconRender}
            >
            </Icon>
          )
        : null,
      children: route.children && routesToMenus(route.children)
    }
  })
}

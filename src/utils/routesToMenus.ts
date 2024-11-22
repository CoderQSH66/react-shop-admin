import type { MenuProps } from 'antd'
import type { RouteObject } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

export default function routesToMenus(routes: RouteObject[]): Omit<MenuItem, 'type'>[] {
  return routes.map<Omit<MenuItem, 'type'>>((route) => {
    return {
      key: route.path,
      label: route.meta?.title,
      children: route.children && routesToMenus(route.children)
    }
  })
}

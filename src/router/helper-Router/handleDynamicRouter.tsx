import type { IMenuProps } from '@/types'
import type { RouteObject } from 'react-router-dom'
import AuthRoute from '../AuthRoute'
import LazyLoad from '../LazyLoad'
import routes from '../routes'
import layoutErrorRoutes from '../routes/layout-error'

export const splitPath = (path: string) => {
  return path === '/' ? `/${'/index'.split('/').splice(1).join('-')}` : `/${path.split('/').splice(1).join('-')}`
}

/** 将路由菜单转化为路由映射表 */
export const menuListToRoutes = (menus: IMenuProps[]): RouteObject[] => {
  const routes: RouteObject[] = []
  menus.forEach((menu) => {
    const route: RouteObject = {
    }
    if (menu.frontpath) {
      route.path = splitPath(menu.frontpath)
      route.meta = {
        title: menu.name,
        icon: 'HomeOutlined'
      }
      route.element = (
        <AuthRoute>
          <LazyLoad name={route.path.slice(1)}></LazyLoad>
        </AuthRoute>
      )
      routes.push(route)
    }
    if (menu.child && menu.child.length > 0) {
      routes.push(...menuListToRoutes(menu.child))
    }
  })
  return routes
}

/** 动态添加路由 */
export const addRoutes = (menus: IMenuProps[]) => {
  const rootChildroutes = [...menuListToRoutes(menus), ...layoutErrorRoutes]
  const rootRoute = routes.at(1)
  rootRoute!.children = [...rootChildroutes]
  return routes
}

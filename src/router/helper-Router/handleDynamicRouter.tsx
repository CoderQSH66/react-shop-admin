import type { RouteObject } from 'react-router-dom'
import routes from '../routes'

/** 将路由菜单转化为路由映射表 */
export const menuListToRoutes = () => {}

/** 动态添加路由 */
export const addRoutes = (childRoutes: RouteObject[]) => {
  const rootChildroutes = childRoutes.reduce((originList, route) => {
    originList.push(...route.children as any)
    return originList
  }, [] as RouteObject[])
  const rootRoute = routes.at(1)
  rootRoute!.children = [...rootChildroutes]
  return routes
}

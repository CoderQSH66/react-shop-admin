import type { IMenuProps } from '@/types'
import { createBrowserRouter } from 'react-router-dom'
import { addRoutes } from './helper-Router/handleDynamicRouter'

// 路由配置选项
const routerOptions = {
  future: {
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
    v7_startTransition: true
  }
}

// 路由对象
const createRouter = (menus: IMenuProps[]) => {
  const routes = addRoutes(menus)
  // console.log(routes)
  const router = createBrowserRouter(routes, routerOptions)
  return router
}
export default createRouter

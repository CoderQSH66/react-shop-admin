import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { addRoutes } from './helper-Router/handleDynamicRouter'

// 路由配置选项
const routerOptions = {
  future: {
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true
  }
}

// 路由对象
const createRouter = (rootChildRoutes: RouteObject[]) => {
  const routes = addRoutes(rootChildRoutes)
  // console.log(routes)
  const router = createBrowserRouter(routes, routerOptions)
  return router
}
export default createRouter

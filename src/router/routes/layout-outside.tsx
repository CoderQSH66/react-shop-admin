import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const layoutOutsideRoutes: RouteObject[] = [
  // 登录页
  {
    path: '/login',
    element: <LazyLoad name="login"></LazyLoad>
  },
  // 404页面
  {
    path: '*',
    element: <LazyLoad name="not-found"></LazyLoad>
  }
]

export default layoutOutsideRoutes

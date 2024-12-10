import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const layoutOutsideRoutes: RouteObject[] = [
  // 登录页
  {
    path: '/login',
    element: <LazyLoad name="login"></LazyLoad>
  }

]

export default layoutOutsideRoutes

import type { RouteObject } from 'react-router-dom'
import LazyLoad from '../LazyLoad'

const layoutErrorRoutes: RouteObject[] = [

  // 404页面
  {
    path: '*',
    element: <LazyLoad name="not-found"></LazyLoad>
  }
]

export default layoutErrorRoutes
